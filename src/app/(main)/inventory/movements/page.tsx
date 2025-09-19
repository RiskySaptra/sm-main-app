'use client';

import { StockMovement } from '@/components/inventory/stock-movement';

const mockMovements = [
  {
    id: '1',
    productName: 'Product A',
    type: 'PURCHASE',
    quantity: 50,
    date: '2024-03-15T10:00:00Z',
    reference: 'PO-001',
    notes: 'Regular stock replenishment',
    status: 'COMPLETED',
  },
];

export default function MovementsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Stock Movements</h1>
      <StockMovement movements={mockMovements} onAddMovement={() => {}} />
    </div>
  );
}