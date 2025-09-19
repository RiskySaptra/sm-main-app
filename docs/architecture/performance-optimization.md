# Performance Optimization Implementation Guide

## Overview

This document provides detailed implementation guidelines for the performance optimization modules in the Store Management Service. Each module is designed to address specific performance aspects and ensure optimal system operation.

## 1. Caching Module

### Implementation Details

```typescript
// src/modules/cache/cache.module.ts
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 3600, // Default TTL in seconds
        max: 100, // Maximum number of items in cache
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CustomCacheModule {}
```

### Cache Strategies

1. **Entity Caching**
```typescript
@Injectable()
export class ProductService {
  @CacheTTL(3600)
  async findOne(id: string): Promise<Product> {
    const cacheKey = `product:${id}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const product = await this.productRepository.findOne(id);
    await this.cacheManager.set(cacheKey, product);
    return product;
  }

  @CacheEvict('product')
  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.update(id, data);
    return product;
  }
}
```

2. **Response Caching**
```typescript
@Controller('products')
export class ProductController {
  @UseInterceptors(HttpCacheInterceptor)
  @CacheTTL(1800)
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
```

## 2. Performance Monitoring Module

### Metrics Collection

```typescript
// src/modules/monitoring/metrics.service.ts
@Injectable()
export class MetricsService {
  private readonly requestDuration: Histogram;
  private readonly activeRequests: Gauge;
  private readonly totalRequests: Counter;

  constructor() {
    this.requestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5],
    });

    this.activeRequests = new Gauge({
      name: 'http_requests_active',
      help: 'Number of active HTTP requests',
      labelNames: ['method', 'route'],
    });

    this.totalRequests = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    });
  }

  recordMetrics(method: string, route: string, status: number, duration: number) {
    this.requestDuration.labels(method, route, status.toString()).observe(duration);
    this.totalRequests.labels(method, route, status.toString()).inc();
  }
}
```

### Performance Interceptor

```typescript
// src/modules/monitoring/performance.interceptor.ts
@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          this.metricsService.recordMetrics(method, url, 200, duration);

          if (duration > 1000) {
            this.logger.warn(
              `Slow request: ${method} ${url} took ${duration}ms`,
              'Performance',
            );
          }
        },
        error: (error) => {
          const duration = Date.now() - start;
          this.metricsService.recordMetrics(
            method,
            url,
            error.status || 500,
            duration,
          );
        },
      }),
    );
  }
}
```

## 3. Database Optimization Module

### Query Optimization

```typescript
// src/modules/database/query-optimizer.service.ts
@Injectable()
export class QueryOptimizerService {
  constructor(
    @InjectConnection()
    private connection: Connection,
  ) {}

  async optimizeQuery(queryBuilder: SelectQueryBuilder<any>): Promise<void> {
    // Add necessary indexes
    await this.ensureIndexes(queryBuilder);

    // Enable query result caching
    queryBuilder.cache(true);

    // Add query hints
    this.addQueryHints(queryBuilder);
  }

  private async ensureIndexes(queryBuilder: SelectQueryBuilder<any>): Promise<void> {
    const tableName = queryBuilder.expressionMap.mainAlias?.tableName;
    const columns = this.extractColumnsFromQuery(queryBuilder);

    for (const column of columns) {
      await this.connection.query(
        `CREATE INDEX IF NOT EXISTS idx_${tableName}_${column} ON ${tableName} (${column})`,
      );
    }
  }

  private addQueryHints(queryBuilder: SelectQueryBuilder<any>): void {
    // Add PostgreSQL specific query hints
    queryBuilder.setQueryRunner(
      queryBuilder.connection.createQueryRunner('slave'),
    );
  }
}
```

### Connection Pool Management

```typescript
// src/config/database.config.ts
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  extra: {
    // Connection pool settings
    poolSize: 20,
    maxQueryExecutionTime: 1000,
    connectionTimeoutMillis: 10000,
    statement_timeout: 10000,
    idle_in_transaction_session_timeout: 10000,
  },
  // Query logging and debugging
  logging: ['error', 'warn', 'schema'],
  logger: 'advanced-console',
};
```

## 4. Rate Limiting Module

### Implementation

```typescript
// src/modules/rate-limiting/rate-limit.module.ts
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('RATE_LIMIT_TTL'),
        limit: config.get('RATE_LIMIT_MAX'),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class RateLimitModule {}
```

### Custom Rate Limiting Strategy

```typescript
// src/modules/rate-limiting/custom-throttler.guard.ts
@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super();
  }

  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const client = context.switchToHttp().getRequest();
    const ip = client.ips.length ? client.ips[0] : client.ip;
    const user = client.user;

    // Get role-based limits
    const roleLimit = this.getRoleLimit(user?.role);
    const key = `${this.prefix}:${ip}:${user?.role}`;

    // Check rate limit using Redis
    const current = await this.redisService.incr(key);
    if (current === 1) {
      await this.redisService.expire(key, ttl);
    }

    if (current > (roleLimit || limit)) {
      throw new ThrottlerException();
    }

    return true;
  }

  private getRoleLimit(role: string): number {
    const limits = {
      admin: 1000,
      user: 100,
      anonymous: 50,
    };
    return limits[role] || limits.anonymous;
  }
}
```

## 5. Load Balancing Module

### Nginx Configuration

```nginx
# /etc/nginx/conf.d/app.conf
upstream app_servers {
    least_conn;  # Least connections algorithm
    server app1:3000;
    server app2:3000;
    server app3:3000;
    keepalive 32;
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://app_servers;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Rate limiting
        limit_req zone=one burst=10 nodelay;
        limit_req_status 429;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://app_servers/health;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Health check configuration
        health_check interval=5s
                     fails=3
                     passes=2
                     uri=/health
                     match=health_ok;
    }
}

# Rate limiting zones
limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;

# Health check match
match health_ok {
    status 200;
    header Content-Type = application/json;
    body ~ '"status":"up"';
}
```

### Application Health Check

```typescript
// src/modules/health/health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private redis: RedisHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.health.check([
      // Database health
      () => this.db.pingCheck('database'),
      
      // Redis health
      () => this.redis.pingCheck('redis'),
      
      // Memory health
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      
      // Custom health check
      () => this.checkCustomHealth(),
    ]);
  }

  private async checkCustomHealth() {
    const metrics = await this.getSystemMetrics();
    return {
      custom: {
        status: metrics.healthy ? 'up' : 'down',
        details: metrics,
      },
    };
  }
}
```

## Best Practices and Guidelines

1. **Caching Strategy**
   - Use Redis for distributed caching
   - Implement cache invalidation patterns
   - Set appropriate TTL values
   - Monitor cache hit rates

2. **Performance Monitoring**
   - Track key performance metrics
   - Set up alerting thresholds
   - Regular performance reviews
   - Monitor resource utilization

3. **Database Optimization**
   - Regular index maintenance
   - Query optimization
   - Connection pool tuning
   - Regular database maintenance

4. **Rate Limiting**
   - Implement graduated rate limits
   - Monitor rate limit hits
   - Adjust limits based on usage patterns
   - Implement retry mechanisms

5. **Load Balancing**
   - Regular health checks
   - Monitor server loads
   - Implement failover strategies
   - Regular load testing

## Maintenance and Monitoring

### Regular Tasks

1. **Daily**
   - Monitor performance metrics
   - Check error logs
   - Review rate limit hits
   - Verify health check status

2. **Weekly**
   - Analyze performance trends
   - Review cache hit rates
   - Check database performance
   - Update load balancing configuration

3. **Monthly**
   - Performance optimization review
   - Database index optimization
   - Load testing
   - Security updates

### Alerting Configuration

```typescript
// src/modules/monitoring/alert.service.ts
@Injectable()
export class AlertService {
  private readonly alertThresholds = {
    responseTime: 1000, // ms
    errorRate: 0.01, // 1%
    cpuUsage: 0.8, // 80%
    memoryUsage: 0.8, // 80%
  };

  async checkAlerts(metrics: SystemMetrics): Promise<void> {
    if (metrics.responseTime > this.alertThresholds.responseTime) {
      await this.sendAlert('High Response Time', metrics);
    }

    if (metrics.errorRate > this.alertThresholds.errorRate) {
      await this.sendAlert('High Error Rate', metrics);
    }

    if (metrics.cpuUsage > this.alertThresholds.cpuUsage) {
      await this.sendAlert('High CPU Usage', metrics);
    }

    if (metrics.memoryUsage > this.alertThresholds.memoryUsage) {
      await this.sendAlert('High Memory Usage', metrics);
    }
  }

  private async sendAlert(type: string, metrics: SystemMetrics): Promise<void> {
    // Implement alert notification (e.g., email, Slack, etc.)
  }
}
```