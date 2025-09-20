import {
  SalesOrder,
  OrderStatus,
  PaymentStatus,
} from '@/app/(main)/sales-orders/_lib/types';
import { mockInventoryItems } from './inventory';
import { mockCustomers } from './customers';
import { SalesOrderItem } from '@/app/(main)/sales-orders/_lib/types';

export const mockSalesOrders: SalesOrder[] = Array.from(
  { length: 25 },
  (_, index) => {
    const customer = mockCustomers[index % mockCustomers.length];
    const numItems = Math.floor(Math.random() * 3) + 1; // 1 to 3 items per order
    const orderItems: SalesOrderItem[] = [];
    let subtotal = 0;

    for (let i = 0; i < numItems; i++) {
      const item =
        mockInventoryItems[
          Math.floor(Math.random() * mockInventoryItems.length)
        ];
      const quantity = Math.floor(Math.random() * 3) + 1; // 1 to 3 of each item
      const itemSubtotal = item.price * quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        id: `item-${index}-${i}`,
        orderId: `SO-2024-00${index + 1}`,
        inventoryItemId: item.id,
        storeId: 'STORE-1',
        sku: item.sku,
        name: item.name,
        quantity: quantity,
        unitPrice: item.price,
        subtotal: itemSubtotal,
        tax: itemSubtotal * 0.11,
        total: itemSubtotal * 1.11,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const tax = subtotal * 0.11;
    const shipping = Math.random() * 50000 + 25000;
    const total = subtotal + tax + shipping;
    const orderDate = new Date(
      new Date().getTime() - Math.random() * 45 * 24 * 60 * 60 * 1000
    ); // Within the last 45 days

    const orderStatuses = [
      OrderStatus.PENDING,
      OrderStatus.PROCESSING,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
      OrderStatus.CANCELLED,
    ];
    const paymentStatuses = [
      PaymentStatus.PENDING,
      PaymentStatus.PAID,
      PaymentStatus.REFUNDED,
    ];

    const status = orderStatuses[index % orderStatuses.length];
    let paymentStatus = paymentStatuses[index % paymentStatuses.length];

    // Logic for more realistic statuses
    if (status === OrderStatus.CANCELLED) {
      paymentStatus = PaymentStatus.REFUNDED;
    } else if (status === OrderStatus.DELIVERED) {
      paymentStatus = PaymentStatus.PAID;
    } else if (status === OrderStatus.REFUNDED) {
      paymentStatus = PaymentStatus.REFUNDED;
    }

    return {
      id: `SO-2024-00${index + 1}`,
      orderNumber: `SO-2024-00${index + 1}`,
      storeId: 'STORE-1',
      customerId: customer.id,
      status,
      paymentStatus,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress: customer.address,
      billingAddress: customer.address,
      items: orderItems,
      createdAt: orderDate,
      updatedAt: new Date(orderDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000), // Updated within 5 days of order
    };
  }
);