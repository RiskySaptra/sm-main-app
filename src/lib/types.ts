export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  category: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
  children?: Category[];
}

export interface PaymentData {
  amount: string;
  currency: string;
  [key: string]: any;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'PAYMENT' | 'REFUND' | 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  reference: string;
  description?: string;
}

export interface RevenueMetric {
  total: number;
  change: number;
  trend: 'up' | 'down';
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface ExpenseMetric {
  total: number;
  change: number;
  trend: 'up' | 'down';
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface ProfitMetric {
  total: number;
  margin: number;
  change: number;
  trend: 'up' | 'down';
}

export interface PurchaseOrderData {
  supplierId: string;
  [key: string]: any;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: 'ACTIVE' | 'INACTIVE';
  rating: number;
  paymentTerms: string;
  preferredSupplier: boolean;
}

export interface OrderItem {
  productId: string;
  productName?: string;
  quantity: number;
  unitPrice: number;
  stockLocation?: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber?: string;
}

export interface FulfillmentOrder {
  id: string;
  date: string;
  customerName: string;
  shippingAddress: string;
  items: OrderItem[];
  status: 'PENDING' | 'PICKING' | 'PACKING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
}