import {
  MovementType,
  StockMovement,
} from '@/app/(main)/inventory/_lib/types';
import { mockInventoryItems } from './inventory';
import { mockPurchaseOrders } from './purchase';
import { mockSalesOrders } from './sales';

export const mockStockMovements: StockMovement[] = [];

// Generate movements from Purchase Orders
mockPurchaseOrders.forEach((po) => {
  if (
    po.status === 'RECEIVED' ||
    po.status === 'PARTIALLY_RECEIVED'
  ) {
    po.items.forEach((item) => {
      if (item.receivedQuantity > 0) {
        mockStockMovements.push({
          id: `move-po-${po.id}-${item.id}`,
          inventoryItemId: item.inventoryItemId,
          storeId: po.storeId,
          type: MovementType.PURCHASE,
          quantity: item.receivedQuantity,
          referenceNumber: po.orderNumber,
          notes: `Received from PO ${po.orderNumber}`,
          performedBy: po.createdById,
          createdAt: po.updatedAt,
        });
      }
    });
  }
});

// Generate movements from Sales Orders
mockSalesOrders.forEach((so) => {
  if (so.status === 'SHIPPED' || so.status === 'DELIVERED') {
    so.items.forEach((item) => {
      mockStockMovements.push({
        id: `move-so-${so.id}-${item.inventoryItemId}`,
        inventoryItemId: item.inventoryItemId,
        storeId: so.storeId,
        type: MovementType.SALE,
        quantity: -item.quantity, // Negative for sale
        referenceNumber: so.orderNumber,
        notes: `Shipped for SO ${so.orderNumber}`,
        performedBy: 'USER-2', // Assuming a generic user for sales
        createdAt: so.updatedAt,
      });
    });
  } else if (so.status === 'REFUNDED') {
    so.items.forEach((item) => {
      mockStockMovements.push({
        id: `move-so-${so.id}-${item.inventoryItemId}`,
        inventoryItemId: item.inventoryItemId,
        storeId: so.storeId,
        type: MovementType.RETURN,
        quantity: item.quantity, // Positive for return
        referenceNumber: so.orderNumber,
        notes: `Return for SO ${so.orderNumber}`,
        performedBy: 'USER-2',
        createdAt: so.updatedAt,
      });
    });
  }
});

// Add some random adjustments
mockInventoryItems.slice(0, 3).forEach((item, index) => {
  mockStockMovements.push({
    id: `move-adj-${index}`,
    inventoryItemId: item.id,
    storeId: 'STORE-1',
    type: MovementType.ADJUSTMENT,
    quantity: index % 2 === 0 ? -2 : 2, // Small adjustments
    referenceNumber: `ADJ-2024-00${index + 1}`,
    notes: 'Cycle count adjustment',
    performedBy: 'USER-1',
    createdAt: new Date(
      new Date().getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000
    ),
  });
});

// Sort movements by date for a chronological history
mockStockMovements.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());