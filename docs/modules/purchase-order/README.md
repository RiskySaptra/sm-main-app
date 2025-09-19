# Purchase Order Module

## Overview

The Purchase Order module manages the creation, tracking, and processing of purchase orders with integrated batch number tracking for inventory management. This module is built using NestJS and follows domain-driven design principles.

## Data Types

### CreatePurchaseOrderDto
- `supplierId` (string): The ID of the supplier.
- `items` (OrderItemDto[]): An array of order items.
- `expectedDeliveryDate` (Date): The expected delivery date.
- `supplierReference` (string, optional): A reference from the supplier.
- `deliveryAddress` (AddressDto): The delivery address.
- `terms` (TermsDto): The terms of the purchase order.
- `notes` (string, optional): Notes about the purchase order.
- `metadata` (object, optional): Additional metadata.

### CreateSupplierDto
- `name` (string): The name of the supplier.
- `code` (string): The code of the supplier.
- `contactPerson` (string): The contact person at the supplier.
- `email` (string): The email of the supplier.
- `phone` (string): The phone number of the supplier.
- `address` (AddressDto): The address of the supplier.
- `categories` (string[]): Categories the supplier belongs to.
- `paymentTerms` (PaymentTermsDto): The payment terms with the supplier.
- `shippingTerms` (ShippingTermsDto): The shipping terms with the supplier.
- `rating` (number, optional): The rating of the supplier.
- `website` (string, optional): The website of the supplier.
- `taxId` (string, optional): The tax ID of the supplier.
- `bankDetails` (BankDetailsDto): The bank details of the supplier.
- `notes` (string, optional): Notes about the supplier.
- `metadata` (object, optional): Additional metadata.

### ReceivePurchaseOrderItemsDto
- `items` (ReceiveItemDto[]): An array of received items.
- `notes` (string, optional): Notes about the received items.

### UpdatePurchaseOrderStatusDto
- `status` (PurchaseOrderStatus, optional): The new status of the purchase order.
- `paymentStatus` (PaymentStatus, optional): The new payment status of the purchase order.
- `notes` (string, optional): Notes about the status update.

## Entities

### PurchaseOrderItem
- `id` (string): The unique identifier for the purchase order item.
- `order` (PurchaseOrder): The purchase order.
- `orderId` (string): The ID of the purchase order.
- `inventoryItem` (InventoryItem): The inventory item.
- `inventoryItemId` (string): The ID of the inventory item.
- `store` (Store): The store the purchase order item belongs to.
- `storeId` (string): The ID of the store.
- `sku` (string): The SKU of the item.
- `name` (string): The name of the item.
- `quantity` (number): The quantity of the item.
- `receivedQuantity` (number): The received quantity of the item.
- `unitPrice` (number): The unit price of the item.
- `subtotal` (number): The subtotal for the item.
- `tax` (number): The tax for the item.
- `total` (number): The total for the item.
- `receiptStatus` (ReceiptStatus): The receipt status of the item.
- `specifications` (object, optional): Specifications of the item.
- `metadata` (object, optional): Additional metadata.
- `createdAt` (Date): The date and time the item was created.
- `updatedAt` (Date): The date and time the item was last updated.
- `lastReceiptDate` (Date, optional): The date of the last receipt.
- `notes` (string, optional): Notes about the item.

### PurchaseOrder
- `id` (string): The unique identifier for the purchase order.
- `orderNumber` (string): The order number.
- `store` (Store): The store the purchase order belongs to.
- `storeId` (string): The ID of the store.
- `supplier` (Supplier): The supplier.
- `supplierId` (string): The ID of the supplier.
- `createdBy` (User): The user who created the purchase order.
- `createdById` (string): The ID of the user who created the purchase order.
- `status` (PurchaseOrderStatus): The status of the purchase order.
- `paymentStatus` (PaymentStatus): The payment status of the purchase order.
- `subtotal` (number): The subtotal of the purchase order.
- `tax` (number): The tax for the purchase order.
- `shipping` (number): The shipping cost for the purchase order.
- `total` (number): The total for the purchase order.
- `expectedDeliveryDate` (Date): The expected delivery date.
- `supplierReference` (string, optional): A reference from the supplier.
- `deliveryAddress` (object): The delivery address.
- `notes` (string, optional): Notes about the purchase order.
- `terms` (object, optional): The terms of the purchase order.
- `metadata` (object, optional): Additional metadata.
- `items` (PurchaseOrderItem[]): The items in the purchase order.
- `createdAt` (Date): The date and time the purchase order was created.
- `updatedAt` (Date): The date and time the purchase order was last updated.
- `version` (number): The version number of the record.
- `sentAt` (Date, optional): The date and time the purchase order was sent.
- `confirmedAt` (Date, optional): The date and time the purchase order was confirmed.
- `receivedAt` (Date, optional): The date and time the purchase order was received.
- `cancelledAt` (Date, optional): The date and time the purchase order was cancelled.

### Supplier
- `id` (string): The unique identifier for the supplier.
- `name` (string): The name of the supplier.
- `store` (Store): The store the supplier belongs to.
- `storeId` (string): The ID of the store.
- `code` (string): The code of the supplier.
- `contactPerson` (string): The contact person at the supplier.
- `email` (string): The email of the supplier.
- `phone` (string): The phone number of the supplier.
- `address` (object): The address of the supplier.
- `status` (SupplierStatus): The status of the supplier.
- `categories` (string[]): Categories the supplier belongs to.
- `paymentTerms` (object, optional): The payment terms with the supplier.
- `shippingTerms` (object, optional): The shipping terms with the supplier.
- `rating` (number): The rating of the supplier.
- `website` (string, optional): The website of the supplier.
- `taxId` (string, optional): The tax ID of the supplier.
- `bankDetails` (object, optional): The bank details of the supplier.
- `notes` (string, optional): Notes about the supplier.
- `metadata` (object, optional): Additional metadata.
- `orders` (PurchaseOrder[]): The purchase orders from the supplier.
- `createdAt` (Date): The date and time the supplier was created.
- `updatedAt` (Date): The date and time the supplier was last updated.
- `lastOrderDate` (Date, optional): The date of the last order.
- `totalOrderValue` (number): The total value of orders from the supplier.
- `orderCount` (number): The number of orders from the supplier.

## Enums

### PurchaseOrderStatus
- `DRAFT`
- `PENDING`
- `SENT`
- `CONFIRMED`
- `PARTIALLY_RECEIVED`
- `RECEIVED`
- `CANCELLED`

### PaymentStatus
- `PENDING`
- `PARTIALLY_PAID`
- `PAID`
- `CANCELLED`

### ReceiptStatus
- `PENDING`
- `PARTIALLY_RECEIVED`
- `RECEIVED`
- `REJECTED`

### SupplierStatus
- `ACTIVE`
- `INACTIVE`
- `BLOCKED`