export interface SalesOrderItem {
  id: string;
  orderId: string;
  inventoryItemId: string;
  storeId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  storeId: string;
  customerId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: object;
  billingAddress: object;
  notes?: string;
  items: SalesOrderItem[];
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
}

export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  PAID = 'PAID',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}