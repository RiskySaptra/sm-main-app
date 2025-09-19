'use client';

import { TransactionHistory } from '@/components/finance/transaction-history';

const mockTransactions = [
  {
    id: '1',
    date: '2024-03-15T10:00:00Z',
    type: 'PAYMENT',
    amount: 100,
    currency: 'USD',
    status: 'COMPLETED',
    reference: 'INV-001',
  },
];

export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Transactions</h1>
      <TransactionHistory transactions={mockTransactions} />
    </div>
  );
}