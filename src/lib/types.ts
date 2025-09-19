export enum ProductStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface Variant {
  id: string;
  productId: string;
  sku: string;
  storeId: string;
  name: string;
  attributes: object;
  price: number;
  isActive: boolean;
  images: string[];
  thumbnailUrl?: string;
  specifications?: object;
  metadata?: object;
  stock: number;
  reservedStock: number;
  lowStockThreshold?: number;
  trackInventory: boolean;
  isOnSale: boolean;
  salePrice?: number;
  saleStartDate?: Date;
  saleEndDate?: Date;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  isShippable: boolean;
  barcode?: string;
  upc?: string;
  ean?: string;
}

export interface Seo {
  title: string;
  description: string;
  keywords: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  status: ProductStatus;
  basePrice: number;
  images: string[];
  thumbnailUrl?: string;
  tags?: string[];
  specifications?: object;
  hasVariants?: boolean;
  variants?: Variant[];
  isFeatured?: boolean;
  displayOrder?: number;
  seo?: Seo;
  lowStockThreshold?: number;
  trackInventory?: boolean;
  isOnSale?: boolean;
  salePrice?: number;
  saleStartDate?: Date;
  saleEndDate?: Date;
  relatedProductIds?: string[];
  brand?: string;
  manufacturer?: string;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  isShippable?: boolean;
  metadata?: object;
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
  [key: string]: unknown;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'PAYMENT' | 'REFUND' | 'WITHDRAWAL' | 'DEPOSIT';
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
  [key: string]: unknown;
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
export interface StockItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  status: 'ACTIVE' | 'DISCONTINUED' | 'OUT_OF_STOCK';
  lastUpdated: string;
}
export interface StockMovement {
  id: string;
  productName: string;
  type: 'PURCHASE' | 'SALE' | 'RETURN' | 'ADJUSTMENT' | 'TRANSFER';
  quantity: number;
  date: string;
  reference: string;
  notes?: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
}