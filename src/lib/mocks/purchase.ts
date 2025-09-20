import {
  PurchaseOrder,
  PurchaseOrderStatus,
  PaymentStatus,
  ReceiptStatus,
  Supplier,
  SupplierStatus,
} from '@/app/(main)/purchase/_lib/types';
import { mockInventoryItems } from './inventory';

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Supplier A',
    storeId: 'STORE-1',
    code: 'SUP-A',
    contactPerson: 'John Doe',
    email: 'john.doe@suppliera.com',
    phone: '123-456-7890',
    address: {
      street: '123 Supplier St',
      city: 'Supply City',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    status: SupplierStatus.ACTIVE,
    categories: ['Raw Materials'],
    rating: 4.5,
    createdAt: new Date('2023-01-15T09:00:00Z'),
    updatedAt: new Date('2023-01-15T09:00:00Z'),
    totalOrderValue: 225000000,
    orderCount: 10,
  },
  {
    id: '2',
    name: 'Supplier B',
    storeId: 'STORE-1',
    code: 'SUP-B',
    contactPerson: 'Jane Smith',
    email: 'jane.smith@supplierb.com',
    phone: '098-765-4321',
    address: {
      street: '456 Supplier Ave',
      city: 'Supply City',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    status: SupplierStatus.ACTIVE,
    categories: ['Packaging'],
    rating: 4.0,
    createdAt: new Date('2023-02-20T10:00:00Z'),
    updatedAt: new Date('2023-02-20T10:00:00Z'),
    totalOrderValue: 375000000,
    orderCount: 15,
  },
];

import { PurchaseOrderItem } from '@/app/(main)/purchase/_lib/types';

export const mockPurchaseOrders: PurchaseOrder[] = Array.from(
  { length: 20 },
  (_, index) => {
    const numItems = Math.floor(Math.random() * 4) + 1; // 1 to 4 items per order
    const orderItems: PurchaseOrderItem[] = [];
    let subtotal = 0;

    for (let i = 0; i < numItems; i++) {
      const item =
        mockInventoryItems[
          Math.floor(Math.random() * mockInventoryItems.length)
        ];
      const quantity = Math.floor(Math.random() * 40) + 10; // Order 10 to 50 units
      const unitPrice = item.price * (Math.random() * 0.2 + 0.7); // 70-90% of sale price
      const itemSubtotal = quantity * unitPrice;
      subtotal += itemSubtotal;

      orderItems.push({
        id: `item-${index}-${i}`,
        orderId: `PO-2024-00${index + 1}`,
        inventoryItemId: item.id,
        storeId: 'STORE-1',
        sku: item.sku,
        name: item.name,
        quantity: quantity,
        receivedQuantity: 0, // Will be updated based on status
        batchNumber: `B-${item.sku}-${index}`,
        unitPrice: unitPrice,
        subtotal: itemSubtotal,
        tax: itemSubtotal * 0.11,
        total: itemSubtotal * 1.11,
        receiptStatus: ReceiptStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const tax = subtotal * 0.11;
    const shipping = Math.random() * 100000 + 50000;
    const total = subtotal + tax + shipping;
    const orderDate = new Date(
      new Date().getTime() - Math.random() * 75 * 24 * 60 * 60 * 1000
    ); // Within the last 75 days
    const expectedDeliveryDate = new Date(
      orderDate.getTime() + (Math.random() * 20 + 7) * 24 * 60 * 60 * 1000
    ); // 7-27 days after order

    const statuses = [
      PurchaseOrderStatus.DRAFT,
      PurchaseOrderStatus.SENT,
      PurchaseOrderStatus.CONFIRMED,
      PurchaseOrderStatus.PARTIALLY_RECEIVED,
      PurchaseOrderStatus.RECEIVED,
      PurchaseOrderStatus.CANCELLED,
    ];
    const paymentStatuses = [
      PaymentStatus.PENDING,
      PaymentStatus.PARTIALLY_PAID,
      PaymentStatus.PAID,
      PaymentStatus.CANCELLED,
    ];

    const status = statuses[index % statuses.length];
    let paymentStatus = paymentStatuses[index % paymentStatuses.length];

    // Logic for more realistic statuses
    if (status === PurchaseOrderStatus.RECEIVED) {
      paymentStatus = PaymentStatus.PAID;
      orderItems.forEach((item) => {
        item.receivedQuantity = item.quantity;
        item.receiptStatus = ReceiptStatus.RECEIVED;
      });
    } else if (status === PurchaseOrderStatus.PARTIALLY_RECEIVED) {
      paymentStatus = PaymentStatus.PARTIALLY_PAID;
      orderItems.forEach((item) => {
        item.receivedQuantity = Math.floor(item.quantity / 2);
        item.receiptStatus = ReceiptStatus.PARTIALLY_RECEIVED;
      });
    } else if (status === PurchaseOrderStatus.CANCELLED) {
      paymentStatus = PaymentStatus.CANCELLED;
    }

    return {
      id: `PO-2024-00${index + 1}`,
      orderNumber: `PO-2024-00${index + 1}`,
      storeId: 'STORE-1',
      supplierId: index % 2 === 0 ? '1' : '2',
      createdById: `USER-${(index % 2) + 1}`,
      status,
      paymentStatus,
      subtotal,
      tax,
      shipping,
      total,
      expectedDeliveryDate,
      deliveryAddress: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        country: 'USA',
      },
      items: orderItems,
      createdAt: orderDate,
      updatedAt: new Date(orderDate.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000), // Updated within 10 days of order
      version: 1,
    };
  }
);