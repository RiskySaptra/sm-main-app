'use client';

import { StockLevels } from '@/components/inventory/stock-levels';

const mockStockItems = [
  {
    id: '1',
    name: 'Product A',
    sku: 'SKU001',
    currentStock: 50,
    minimumStock: 20,
    maximumStock: 100,
    status: 'ACTIVE',
    lastUpdated: '2024-03-15T10:00:00Z',
  },
];

export default function StockPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Stock Levels</h1>
      <StockLevels items={mockStockItems} />
    </div>
  );
}