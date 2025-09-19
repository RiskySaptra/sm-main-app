# Catalog Module

## Overview

The Catalog module manages products, categories, and their relationships within the store management system. It provides functionality for product management, categorization, and search capabilities using NestJS and TypeORM.

## Data Types

### CreateCategoryDto
- `name` (string): The name of the category.
- `description` (string, optional): A description of the category.
- `isActive` (boolean, optional): Whether the category is active.
- `imageUrl` (string, optional): A URL for the category's image.
- `parentId` (string, optional): The ID of the parent category.
- `tags` (string[], optional): Tags associated with the category.
- `displayOrder` (number, optional): The display order of the category.
- `seo` (SeoDto, optional): SEO-related fields.
- `metadata` (object, optional): Additional metadata.

### CreateProductDto
- `name` (string): The name of the product.
- `description` (string): A description of the product.
- `shortDescription` (string, optional): A short description of the product.
- `categoryId` (string): The ID of the product's category.
- `status` (ProductStatus, optional): The status of the product.
- `basePrice` (number): The base price of the product.
- `images` (string[]): URLs for the product's images.
- `thumbnailUrl` (string, optional): A URL for the product's thumbnail image.
- `tags` (string[], optional): Tags associated with the product.
- `specifications` (object, optional): Product specifications.
- `hasVariants` (boolean, optional): Whether the product has variants.
- `variants` (VariantDto[], optional): An array of product variants.
- `isFeatured` (boolean, optional): Whether the product is featured.
- `displayOrder` (number, optional): The display order of the product.
- `seo` (SeoDto, optional): SEO-related fields.
- `lowStockThreshold` (number, optional): The low stock threshold for the product.
- `trackInventory` (boolean, optional): Whether to track inventory for the product.
- `isOnSale` (boolean, optional): Whether the product is on sale.
- `salePrice` (number, optional): The sale price of the product.
- `saleStartDate` (Date, optional): The start date of the sale.
- `saleEndDate` (Date, optional): The end date of the sale.
- `relatedProductIds` (string[], optional): IDs of related products.
- `brand` (string, optional): The brand of the product.
- `manufacturer` (string, optional): The manufacturer of the product.
- `weight` (number, optional): The weight of the product.
- `width` (number, optional): The width of the product.
- `height` (number, optional): The height of the product.
- `depth` (number, optional): The depth of the product.
- `isShippable` (boolean, optional): Whether the product is shippable.
- `metadata` (object, optional): Additional metadata.

### SearchProductsDto
- `query` (string, optional): The search query.
- `categoryId` (string, optional): The ID of the category to search in.
- `tags` (string[], optional): Tags to filter by.
- `status` (ProductStatus, optional): The status to filter by.
- `isOnSale` (boolean, optional): Whether to filter by products on sale.
- `inStock` (boolean, optional): Whether to filter by products in stock.
- `minPrice` (number, optional): The minimum price to filter by.
- `maxPrice` (number, optional): The maximum price to filter by.
- `brand` (string, optional): The brand to filter by.
- `manufacturer` (string, optional): The manufacturer to filter by.
- `sortBy` (SortField, optional): The field to sort by.
- `sortOrder` (SortOrder, optional): The order to sort by.
- `page` (number, optional): The page number for pagination.
- `limit` (number, optional): The number of items per page.
- `includeVariants` (boolean, optional): Whether to include variants in the search results.

## Entities

### ProductCategory
- `id` (string): The unique identifier for the category.
- `name` (string): The name of the category.
- `store` (Store): The store the category belongs to.
- `storeId` (string): The ID of the store.
- `slug` (string): The slug for the category.
- `description` (string, optional): A description of the category.
- `isActive` (boolean): Whether the category is active.
- `imageUrl` (string, optional): A URL for the category's image.
- `metadata` (object, optional): Additional metadata.
- `children` (ProductCategory[]): Child categories.
- `parent` (ProductCategory): The parent category.
- `products` (Product[]): Products in the category.
- `productCount` (number): The number of products in the category.
- `tags` (string[]): Tags associated with the category.
- `displayOrder` (number): The display order of the category.
- `createdAt` (Date): The date and time the category was created.
- `updatedAt` (Date): The date and time the category was last updated.
- `seo` (object, optional): SEO-related fields.

### ProductVariant
- `id` (string): The unique identifier for the variant.
- `product` (Product): The product the variant belongs to.
- `productId` (string): The ID of the product.
- `sku` (string): The SKU of the variant.
- `store` (Store): The store the variant belongs to.
- `storeId` (string): The ID of the store.
- `name` (string): The name of the variant.
- `attributes` (object): The attributes of the variant.
- `price` (number): The price of the variant.
- `isActive` (boolean): Whether the variant is active.
- `images` (string[]): URLs for the variant's images.
- `thumbnailUrl` (string, optional): A URL for the variant's thumbnail image.
- `specifications` (object, optional): Variant specifications.
- `metadata` (object, optional): Additional metadata.
- `createdAt` (Date): The date and time the variant was created.
- `updatedAt` (Date): The date and time the variant was last updated.
- `stock` (number): The stock level of the variant.
- `reservedStock` (number): The reserved stock level of the variant.
- `lowStockThreshold` (number, optional): The low stock threshold for the variant.
- `trackInventory` (boolean): Whether to track inventory for the variant.
- `isOnSale` (boolean): Whether the variant is on sale.
- `salePrice` (number, optional): The sale price of the variant.
- `saleStartDate` (Date, optional): The start date of the sale.
- `saleEndDate` (Date, optional): The end date of the sale.
- `weight` (number, optional): The weight of the variant.
- `width` (number, optional): The width of the variant.
- `height` (number, optional): The height of the variant.
- `depth` (number, optional): The depth of the variant.
- `isShippable` (boolean): Whether the variant is shippable.
- `barcode` (string, optional): The barcode of the variant.
- `upc` (string, optional): The UPC of the variant.
- `ean` (string, optional): The EAN of the variant.

## Enums

### ProductStatus
- `DRAFT`
- `PUBLISHED`
- `ARCHIVED`

### SortField
- `NAME`
- `PRICE`
- `CREATED_AT`
- `RATING`
- `VIEW_COUNT`

### SortOrder
- `ASC`
- `DESC`