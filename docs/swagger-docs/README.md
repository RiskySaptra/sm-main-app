# Swagger Documentation Guide

## Overview

This guide outlines the setup, configuration, and best practices for API documentation using Swagger/OpenAPI in the Store Management Service.

## Setup

### Installation

```bash
npm install @nestjs/swagger swagger-ui-express
```

### Configuration

In your `main.ts`:

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Store Management Service')
    .setDescription('API documentation for the Store Management Service')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Catalog')
    .addTag('Inventory')
    .addTag('Purchase Orders')
    .addTag('Sales Orders')
    .addTag('Finance')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
```

## Documentation Guidelines

### Entity Documentation

```typescript
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({
    description: 'The unique identifier for the product',
    example: 'uuid-string',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the product',
    example: 'Premium Widget',
    minLength: 3,
    maxLength: 100,
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The current stock level',
    example: 100,
    minimum: 0,
  })
  @Column()
  stockLevel: number;
}
```

### Controller Documentation

```typescript
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }
}
```

### DTO Documentation

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Premium Widget',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'The initial stock level',
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  stockLevel: number;
}
```

## Security Documentation

### Authentication

```typescript
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@Controller('secure')
export class SecureController {
  @ApiOperation({ summary: 'Protected endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get()
  getData(): Promise<SuccessResponse> {
    return this.secureService.getData();
  }
}
```

### Authorization

```typescript
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  @ApiOperation({ summary: 'Admin only endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: AdminResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions',
  })
  @Roles(UserRole.ADMIN)
  @Get()
  getAdminData(): Promise<AdminResponse> {
    return this.adminService.getData();
  }
}
```

## Error Handling Documentation

```typescript
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: 'Invalid input data',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Invalid input data' },
      error: { type: 'string', example: 'Bad Request' },
    },
  },
})
```

## Testing Documentation

### Integration Tests

```typescript
describe('Product API (e2e)', () => {
  it('/POST products should validate against Swagger schema', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        stockLevel: 100,
      })
      .expect(201)
      .expect(res => {
        expect(res.body).toMatchObject({
          id: expect.any(String),
          name: 'Test Product',
          stockLevel: 100,
        });
      });
  });
});
```

## Best Practices

1. **Consistent Documentation**
   - Document all endpoints
   - Include request/response examples
   - Provide clear descriptions
   - Use proper HTTP status codes

2. **Schema Organization**
   - Group related endpoints with tags
   - Use consistent naming conventions
   - Include all possible response types
   - Document security requirements

3. **Versioning**
   - Include version information in paths
   - Document breaking changes
   - Maintain backwards compatibility
   - Version documentation separately

4. **Security**
   - Document authentication methods
   - Specify required permissions
   - Include security scheme details
   - Document rate limiting

5. **Examples**
   - Provide realistic examples
   - Include error scenarios
   - Show different response types
   - Document edge cases

## Maintenance

1. **Regular Updates**
   - Keep documentation in sync with code
   - Update examples as needed
   - Review and validate schemas
   - Test documentation accuracy

2. **Version Control**
   - Track documentation changes
   - Include documentation in reviews
   - Maintain changelog
   - Archive old versions

3. **Quality Assurance**
   - Validate against OpenAPI spec
   - Test documentation examples
   - Review for completeness
   - Check for broken links