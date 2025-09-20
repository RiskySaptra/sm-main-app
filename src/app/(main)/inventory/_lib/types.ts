export enum ItemStatus {
  ACTIVE = 'ACTIVE',
  DISCONTINUED = 'DISCONTINUED',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export enum MovementType {
  PURCHASE = 'PURCHASE',
  SALE = 'SALE',
  RETURN = 'RETURN',
  ADJUSTMENT = 'ADJUSTMENT',
  TRANSFER = 'TRANSFER',
}

export interface InventoryItem {
  id: string;
  sku: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  reorderPoint: number;
  optimalStock: number;
  status: ItemStatus;
  specifications?: object;
  categories: string[];
  tags: string[];
  location?: string;
  supplier?: string;
  reservedQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  lastStockUpdate?: Date;
  lastOrderDate?: Date;
}

export interface StockMovement {
  id: string;
  inventoryItemId: string;
  storeId: string;
  type: MovementType;
  quantity: number;
  unitPrice?: number;
  referenceNumber?: string;
  sourceLocation?: string;
  destinationLocation?: string;
  notes?: string;
  performedBy: string;
  createdAt: Date;
  metadata?: object;
}