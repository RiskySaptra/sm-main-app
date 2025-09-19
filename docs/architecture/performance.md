# Performance Optimization Architecture

## Caching Module

### Redis Cache Implementation

```typescript
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 60 * 60, // 1 hour default TTL
        max: 1000, // maximum number of items in cache
      }),
    }),
  ],
})
export class CacheConfigModule {}
```

### Cache Strategies

1. **Entity Caching**
```typescript
@Injectable()
export class ProductService {
  @CacheKey('product')
  @CacheTTL(3600)
  @UseInterceptors(CacheInterceptor)
  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }
}
```

2. **Query Result Caching**
```typescript
@QueryResultCache({
  duration: 30000 // 30 seconds
})
@Entity()
export class Product {
  // Entity definition
}
```

3. **API Response Caching**
```typescript
@Controller('products')
@UseInterceptors(HttpCacheInterceptor)
export class ProductController {
  @Get()
  @CacheTTL(30)
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
```

## Performance Monitoring

### Prometheus Integration

```typescript
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

export const RequestCounter = makeCounterProvider({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status'],
});

@Module({
  imports: [PrometheusModule.register()],
  providers: [RequestCounter],
})
export class MonitoringModule {}
```

### Performance Metrics Collection

```typescript
@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  constructor(private readonly counter: Counter<string>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.counter.labels(request.method, request.statusCode).inc();
        
        // Log performance metrics
        Logger.log(
          `${request.method} ${request.url} completed in ${duration}ms`,
          'Performance'
        );
      }),
    );
  }
}
```

## Database Optimization

### TypeORM Query Optimization

```typescript
@Injectable()
export class OptimizedQueryService {
  async findProducts(): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .cache(true)
      .where('product.isActive = :isActive', { isActive: true })
      .orderBy('product.name', 'ASC')
      .take(10)
      .getMany();
  }
}
```

### Index Configuration

```typescript
@Entity('products')
export class Product {
  @Index()
  @Column()
  sku: string;

  @Index(['name', 'category'])
  @Column()
  name: string;

  @ManyToOne(() => Category)
  category: Category;
}
```

### Connection Pool Configuration

```typescript
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      extra: {
        poolSize: 20,
        maxQueryExecutionTime: 1000,
        connectionTimeoutMillis: 10000,
      },
    }),
  ],
})
export class DatabaseModule {}
```

## Rate Limiting

### Global Rate Limiting

```typescript
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
  ],
})
export class RateLimitModule {}

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected errorMessage = 'Rate limit exceeded';
  protected getTracker(req: Record<string, any>): string {
    return req.ips.length ? req.ips[0] : req.ip;
  }
}
```

### Route-Specific Rate Limiting

```typescript
@Controller('products')
export class ProductController {
  @Throttle(5, 10) // 5 requests per 10 seconds
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
```

## Load Balancing

### Nginx Configuration

```nginx
upstream api_servers {
    least_conn;
    server api1.example.com:3000;
    server api2.example.com:3000;
    server api3.example.com:3000;
    keepalive 32;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://api_servers;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Health Check Implementation

```typescript
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

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
    ]);
  }
}
```

## Performance Best Practices

1. **Query Optimization**
   - Use proper indexes
   - Implement pagination
   - Optimize JOIN operations
   - Cache frequent queries

2. **Resource Management**
   - Implement connection pooling
   - Use appropriate cache TTLs
   - Monitor memory usage
   - Implement garbage collection strategies

3. **Response Optimization**
   - Compress responses
   - Use ETags
   - Implement response caching
   - Optimize payload size

4. **Monitoring and Alerts**
   - Track response times
   - Monitor error rates
   - Set up alerting thresholds
   - Implement logging strategy