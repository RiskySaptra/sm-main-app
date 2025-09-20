'use client';

import * as React from 'react';
import { PaymentForm } from '@/components/finance/payment-form';
import { TransactionHistory } from '@/components/finance/transaction-history';
import { FinancialReports } from '@/components/finance/financial-reports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  PaymentData,
  RevenueMetric,
  ExpenseMetric,
  ProfitMetric,
} from '@/lib/types';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@/app/(main)/finance/_lib/types';

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15T10:30:00',
    type: TransactionType.PAYMENT,
    amount: 1500.00,
    currency: 'IDR',
    status: TransactionStatus.COMPLETED,
    reference: 'INV-2024-001',
    description: 'Product purchase payment',
  },
  {
    id: '2',
    date: '2024-03-14T15:45:00',
    type: TransactionType.REFUND,
    amount: 250.00,
    currency: 'IDR',
    status: TransactionStatus.PENDING,
    reference: 'REF-2024-001',
    description: 'Customer refund request',
  },
  {
    id: '3',
    date: '2024-03-14T09:15:00',
    type: TransactionType.DEPOSIT,
    amount: 5000.00,
    currency: 'IDR',
    status: TransactionStatus.COMPLETED,
    reference: 'DEP-2024-001',
    description: 'Bank transfer deposit',
  },
];

const mockFinancialData: {
  revenue: RevenueMetric;
  expenses: ExpenseMetric;
  profit: ProfitMetric;
} = {
  revenue: {
    total: 75000.00,
    change: 12.5,
    trend: 'up',
    breakdown: [
      { category: 'Product Sales', amount: 45000.00, percentage: 60 },
      { category: 'Services', amount: 20000.00, percentage: 26.67 },
      { category: 'Subscriptions', amount: 10000.00, percentage: 13.33 },
    ],
  },
  expenses: {
    total: 45000.00,
    change: -5.2,
    trend: 'down',
    breakdown: [
      { category: 'Inventory', amount: 25000.00, percentage: 55.56 },
      { category: 'Operations', amount: 12000.00, percentage: 26.67 },
      { category: 'Marketing', amount: 8000.00, percentage: 17.77 },
    ],
  },
  profit: {
    total: 30000.00,
    margin: 40,
    change: 15.8,
    trend: 'up',
  },
};

export default function FinancePage() {
  const { toast } = useToast();
  const [reportPeriod, setReportPeriod] = React.useState('monthly');

  const handlePaymentSubmit = async (data: PaymentData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Payment Processed',
      description: `Successfully processed payment of ${data.amount} ${data.currency}`,
      variant: 'success',
    });
  };

  const handleTransactionExport = () => {
    toast({
      title: 'Export Started',
      description: 'Your transaction history export will be ready shortly.',
    });
  };

  const handleReportExport = () => {
    toast({
      title: 'Export Started',
      description: `Your ${reportPeriod} financial report will be ready shortly.`,
    });
  };

  const handleViewTransactionDetails = (transaction: Transaction) => {
    toast({
      title: 'Transaction Details',
      description: `Viewing details for transaction ${transaction.reference}`,
    });
  };

  return (
    <div className="container space-y-8 py-8">
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payments">Process Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Financial Reports</h2>
          <FinancialReports
            revenue={mockFinancialData.revenue}
            expenses={mockFinancialData.expenses}
            profit={mockFinancialData.profit}
            period={reportPeriod}
            onPeriodChange={setReportPeriod}
            onExport={handleReportExport}
          />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
          <TransactionHistory
            transactions={mockTransactions}
            onExport={handleTransactionExport}
            onViewDetails={handleViewTransactionDetails}
          />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Process Payment</h2>
          <div className="mx-auto max-w-2xl">
            <PaymentForm onSubmit={handlePaymentSubmit} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}