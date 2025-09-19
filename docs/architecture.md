# Store Management Service Architecture

## Overview

The Store Management Service is built using NestJS, following domain-driven design principles and clean architecture patterns. This document outlines the architectural decisions, patterns, and implementation guidelines for the service, with a focus on performance optimization and scalability.

## Core Architecture Components

### Performance Optimization Modules

1. **Caching Module**
   - Redis-based caching implementation
   - Entity and query result caching
   - Configurable cache strategies
   - Response caching for API endpoints

2. **Performance Monitoring**
   - Prometheus integration
   - Custom metrics collection
   - Performance interceptors
   - Real-time monitoring dashboard

3. **Database Optimization**
   - Query optimization strategies
   - Index management
   - Connection pooling
   - Query result caching

4. **Rate Limiting**
   - Global rate limiting
   - Route-specific throttling
   - Custom rate limiting strategies
   - IP-based tracking

5. **Load Balancing**
   - Nginx configuration
   - Health check endpoints
   - Load distribution strategies
   - High availability setup

## Application Layers

### Domain Layer

```typescript
@Entity('products')
export class Product {
  @ApiProperty({ description: 'Product unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Product name' })
  @Index()
  @Column()
  name: string;

  @ApiProperty({ description: 'Current stock level' })
  @Column()
  stockLevel: number;

  @ApiProperty({ description: 'Product price' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: decimal;
}
```

### Application Layer

```typescript
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly cacheManager: Cache,
  ) {}

  @CacheTTL(3600)
  async findOne(id: string): Promise<Product> {
    const cachedProduct = await this.cacheManager.get(`product:${id}`);
    if (cachedProduct) {
      return cachedProduct;
    }

    const product = await this.productRepository.findOne(id);
    await this.cacheManager.set(`product:${id}`, product);
    return product;
  }
}
```

### Interface Layer

```typescript
@Controller('products')
@UseInterceptors(PerformanceInterceptor)
export class ProductController {
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600)
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  @Throttle(5, 10)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
}
```

## Core Modules

### Authentication Module

```typescript
@Module({
  imports: [
    CacheModule.register(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AuthModule {}
```

### Inventory Module

```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Stock]),
    CacheModule.register(),
    MonitoringModule,
  ],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    StockService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PerformanceInterceptor,
    },
  ],
})
export class InventoryModule {}
```

## Database Design

### Query Optimization

```typescript
@QueryResultCache({ duration: 30000 })
@Entity('purchase_orders')
export class PurchaseOrder {
  @Index(['status', 'createdAt'])
  @Column({
    type: 'enum',
    enum: PurchaseOrderStatus,
  })
  status: PurchaseOrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PurchaseOrderItem, item => item.purchaseOrder, {
    cascade: true,
  })
  items: PurchaseOrderItem[];
}
```

### Connection Pool Configuration

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  extra: {
    poolSize: 20,
    maxQueryExecutionTime: 1000,
    connectionTimeoutMillis: 10000,
  },
})
```

## Performance Monitoring

### Metrics Collection

```typescript
@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.metricsService.recordLatency(request.route.path, duration);
        
        if (duration > 1000) {
          this.logger.warn(
            `Slow request: ${request.method} ${request.url} took ${duration}ms`,
            'Performance'
          );
        }
      }),
    );
  }
}
```

### Health Checks

```typescript
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private redis: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.redis.pingCheck('redis'),
      () => ({
        memory: {
          status: 'up',
          details: process.memoryUsage(),
        },
      }),
    ]);
  }
}
```

## Caching Strategy

### Multi-Level Caching

```typescript
@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly redisCache: RedisCache,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    // Try memory cache first
    const memoryResult = await this.cacheManager.get<T>(key);
    if (memoryResult) {
      return memoryResult;
    }

    // Try Redis cache
    const redisResult = await this.redisCache.get<T>(key);
    if (redisResult) {
      // Store in memory cache for faster subsequent access
      await this.cacheManager.set(key, redisResult, 300);
      return redisResult;
    }

    return null;
  }
}
```

## Rate Limiting

### Custom Rate Limiting Strategy

```typescript
@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const client = context.switchToHttp().getRequest();
    const ip = client.ips.length ? client.ips[0] : client.ip;
    
    // Get user role for different rate limits
    const user = client.user;
    const roleLimit = this.getRoleLimit(user?.role);
    
    const key = `${this.prefix}:${ip}:${user?.role}`;
    const ttls = await this.storageService.getRecord(key);

    if (ttls.length >= (roleLimit || limit)) {
      throw new ThrottlerException();
    }

    return true;
  }
}
```

## Load Balancing

### Application Configuration

```typescript
const app = await NestFactory.create(AppModule);

app.enableCors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
  credentials: true,
});

app.use(helmet());
app.use(compression());

await app.listen(process.env.PORT || 3000, '0.0.0.0');
```

## Error Handling

```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
    private readonly metricsService: MetricsService,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Record error metrics
    this.metricsService.recordError(request.route?.path, status);

    // Log error with context
    this.logger.error(
      `${request.method} ${request.url} failed: ${exception.message}`,
      exception.stack,
      'GlobalExceptionFilter'
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
```

## Deployment Configuration

### Production Environment

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        RATE_LIMIT_TTL: Joi.number().default(60),
        RATE_LIMIT_MAX: Joi.number().default(100),
      }),
    }),
  ],
})
export class AppModule {}