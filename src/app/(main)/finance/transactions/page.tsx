'use client';

import { TransactionHistory } from '@/components/finance/transaction-history';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@/app/(main)/finance/_lib/types';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15T10:00:00Z',
    type: TransactionType.PAYMENT,
    amount: 100,
    currency: 'IDR',
    status: TransactionStatus.COMPLETED,
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