export enum PurchaseOrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  SENT = 'SENT',
  CONFIRMED = 'CONFIRMED',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum ReceiptStatus {
  PENDING = 'PENDING',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  RECEIVED = 'RECEIVED',
  REJECTED = 'REJECTED',
}

export enum SupplierStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Terms {
  paymentTerms: string;
  shippingTerms: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  swiftCode: string;
}

export interface PurchaseOrderItem {
  id: string;
  orderId: string;
  inventoryItemId: string;
  storeId: string;
  sku: string;
  name: string;
  quantity: number;
  receivedQuantity: number;
  unitPrice: number;
  subtotal: number;
  tax: number;
  total: number;
  receiptStatus: ReceiptStatus;
  specifications?: object;
  metadata?: object;
  createdAt: Date;
  updatedAt: Date;
  lastReceiptDate?: Date;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  storeId: string;
  supplierId: string;
  createdById: string;
  status: PurchaseOrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  expectedDeliveryDate: Date;
  supplierReference?: string;
  deliveryAddress: Address;
  notes?: string;
  terms?: Terms;
  metadata?: object;
  items: PurchaseOrderItem[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
  sentAt?: Date;
  confirmedAt?: Date;
  receivedAt?: Date;
  cancelledAt?: Date;
}

export interface Supplier {
  id: string;
  name: string;
  storeId: string;
  code: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: Address;
  status: SupplierStatus;
  categories: string[];
  paymentTerms?: Terms;
  shippingTerms?: Terms;
  rating: number;
  website?: string;
  taxId?: string;
  bankDetails?: BankDetails;
  notes?: string;
  metadata?: object;
  createdAt: Date;
  updatedAt: Date;
  lastOrderDate?: Date;
  totalOrderValue: number;
  orderCount: number;
}