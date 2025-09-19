# Sales Order Module

## Overview

The Sales Order module manages the entire sales process, from order creation to fulfillment and invoicing. Built with NestJS and TypeORM, it provides comprehensive functionality for managing sales orders, customer relationships, and order tracking.

## Data Types

### CreateSalesOrderDto
- `customerId` (string): The ID of the customer.
- `items` (OrderItemDto[]): An array of order items.
- `shippingAddress` (AddressDto): The shipping address.
- `billingAddress` (AddressDto): The billing address.
- `notes` (string, optional): Notes about the sales order.
- `metadata` (object, optional): Additional metadata.

### UpdateOrderStatusDto
- `status` (OrderStatus, optional): The new status of the sales order.
- `paymentStatus` (PaymentStatus, optional): The new payment status of the sales order.
- `notes` (string, optional): Notes about the status update.

## Entities

### SalesOrderItem
- `id` (string): The unique identifier for the sales order item.
- `order` (SalesOrder): The sales order.
- `orderId` (string): The ID of the sales order.
- `inventoryItem` (InventoryItem): The inventory item.
- `inventoryItemId` (string): The ID of the inventory item.
- `store` (Store): The store the sales order item belongs to.
- `storeId` (string): The ID of the store.
- `sku` (string): The SKU of the item.
- `name` (string): The name of the item.
- `quantity` (number): The quantity of the item.
- `unitPrice` (number): The unit price of the item.
- `subtotal` (number): The subtotal for the item.
- `tax` (number): The tax for the item.
- `total` (number): The total for the item.
- `metadata` (object, optional): Additional metadata.
- `createdAt` (Date): The date and time the item was created.
- `updatedAt` (Date): The date and time the item was last updated.
- `shippedAt` (Date, optional): The date and time the item was shipped.
- `deliveredAt` (Date, optional): The date and time the item was delivered.

### SalesOrder
- `id` (string): The unique identifier for the sales order.
- `orderNumber` (string): The order number.
- `store` (Store): The store the sales order belongs to.
- `storeId` (string): The ID of the store.
- `customer` (User): The customer.
- `customerId` (string): The ID of the customer.
- `status` (OrderStatus): The status of the sales order.
- `paymentStatus` (PaymentStatus): The payment status of the sales order.
- `subtotal` (number): The subtotal of the sales order.
- `tax` (number): The tax for the sales order.
- `shipping` (number): The shipping cost for the sales order.
- `total` (number): The total for the sales order.
- `shippingAddress` (object): The shipping address.
- `billingAddress` (object): The billing address.
- `notes` (string, optional): Notes about the sales order.
- `metadata` (object, optional): Additional metadata.
- `items` (SalesOrderItem[]): The items in the sales order.
- `createdAt` (Date): The date and time the sales order was created.
- `updatedAt` (Date): The date and time the sales order was last updated.
- `version` (number): The version number of the record.
- `confirmedAt` (Date, optional): The date and time the sales order was confirmed.
- `shippedAt` (Date, optional): The date and time the sales order was shipped.
- `deliveredAt` (Date, optional): The date and time the sales order was delivered.
- `cancelledAt` (Date, optional): The date and time the sales order was cancelled.

## Enums

### OrderStatus
- `DRAFT`
- `PENDING`
- `CONFIRMED`
- `PROCESSING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`
- `REFUNDED`

### PaymentStatus
- `PENDING`
- `AUTHORIZED`
- `PAID`
- `PARTIALLY_REFUNDED`
- `REFUNDED`
- `FAILED`