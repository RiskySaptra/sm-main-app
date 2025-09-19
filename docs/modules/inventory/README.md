# Inventory Module

## Overview

The Inventory module manages stock levels, tracks stock movements, and handles inventory alerts with integrated batch number tracking. Built using NestJS and TypeORM, it provides comprehensive functionality for managing inventory across the store management system.

## Data Types

### CreateInventoryItemDto
- `sku` (string): The SKU of the inventory item.
- `name` (string): The name of the inventory item.
- `description` (string): A description of the inventory item.
- `price` (number): The price of the inventory item.
- `quantity` (number): The quantity of the inventory item.
- `reorderPoint` (number): The reorder point for the inventory item.
- `optimalStock` (number): The optimal stock level for the inventory item.
- `status` (ItemStatus, optional): The status of the inventory item.
- `specifications` (object, optional): Specifications of the inventory item.
- `categories` (string[], optional): Categories the inventory item belongs to.
- `tags` (string[], optional): Tags associated with the inventory item.
- `location` (string, optional): The location of the inventory item.
- `supplier` (string, optional): The supplier of the inventory item.

### StockMovementDto
- `inventoryItemId` (string): The ID of the inventory item.
- `type` (MovementType): The type of stock movement.
- `quantity` (number): The quantity of the stock movement.
- `unitPrice` (number, optional): The unit price of the stock movement.
- `referenceNumber` (string, optional): A reference number for the stock movement.
- `sourceLocation` (string, optional): The source location of the stock movement.
- `destinationLocation` (string, optional): The destination location of the stock movement.
- `notes` (string, optional): Notes about the stock movement.
- `performedBy` (string): The user who performed the stock movement.
- `metadata` (object, optional): Additional metadata.

### UpdateInventoryItemDto
- Extends `PartialType(CreateInventoryItemDto)`.

## Entities

### InventoryItem
- `id` (string): The unique identifier for the inventory item.
- `sku` (string): The SKU of the inventory item.
- `store` (Store): The store the inventory item belongs to.
- `storeId` (string): The ID of the store.
- `name` (string): The name of the inventory item.
- `description` (string): A description of the inventory item.
- `price` (number): The price of the inventory item.
- `quantity` (number): The quantity of the inventory item.
- `reorderPoint` (number): The reorder point for the inventory item.
- `optimalStock` (number): The optimal stock level for the inventory item.
- `status` (ItemStatus): The status of the inventory item.
- `specifications` (object, optional): Specifications of the inventory item.
- `categories` (string[]): Categories the inventory item belongs to.
- `tags` (string[]): Tags associated with the inventory item.
- `location` (string, optional): The location of the inventory item.
- `supplier` (string, optional): The supplier of the inventory item.
- `reservedQuantity` (number): The reserved quantity of the inventory item.
- `createdAt` (Date): The date and time the inventory item was created.
- `updatedAt` (Date): The date and time the inventory item was last updated.
- `version` (number): The version number of the record.
- `lastStockUpdate` (Date, optional): The date and time of the last stock update.
- `lastOrderDate` (Date, optional): The date and time of the last order.

### StockMovement
- `id` (string): The unique identifier for the stock movement.
- `inventoryItem` (InventoryItem): The inventory item.
- `inventoryItemId` (string): The ID of the inventory item.
- `store` (Store): The store the stock movement belongs to.
- `storeId` (string): The ID of the store.
- `type` (MovementType): The type of stock movement.
- `quantity` (number): The quantity of the stock movement.
- `unitPrice` (number, optional): The unit price of the stock movement.
- `referenceNumber` (string, optional): A reference number for the stock movement.
- `sourceLocation` (string, optional): The source location of the stock movement.
- `destinationLocation` (string, optional): The destination location of the stock movement.
- `notes` (string, optional): Notes about the stock movement.
- `performedBy` (string): The user who performed the stock movement.
- `createdAt` (Date): The date and time the stock movement was created.
- `metadata` (object, optional): Additional metadata.

## Enums

### ItemStatus
- `ACTIVE`
- `DISCONTINUED`
- `OUT_OF_STOCK`

### MovementType
- `PURCHASE`
- `SALE`
- `RETURN`
- `ADJUSTMENT`
- `TRANSFER`