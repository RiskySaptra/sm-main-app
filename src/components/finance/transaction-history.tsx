'use client';

import * as React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Download,
  FileText,
  Filter,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils/inventory';
import { cn } from '@/lib/utils';

import {
  Transaction,
  TransactionType,
  TransactionStatus,
} from '@/app/(main)/finance/_lib/types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onExport?: () => void;
  onViewDetails?: (transaction: Transaction) => void;
}

export function TransactionHistory({
  transactions,
  onExport,
  onViewDetails,
}: TransactionHistoryProps) {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('date'));
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.getValue('type') as string;
        const isIncoming = [
          TransactionType.PAYMENT,
          TransactionType.DEPOSIT,
        ].includes(type as TransactionType);
        return (
          <div className="flex items-center gap-2">
            {isIncoming ? (
              <ArrowDownIcon className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowUpIcon className="h-4 w-4 text-red-500" />
            )}
            <Badge
              variant="secondary"
              className={cn({
                'bg-green-100 text-green-800':
                  type === TransactionType.PAYMENT,
                'bg-red-100 text-red-800': type === TransactionType.REFUND,
                'bg-orange-100 text-orange-800':
                  type === TransactionType.WITHDRAWAL,
                'bg-blue-100 text-blue-800': type === TransactionType.DEPOSIT,
              })}
            >
              {type}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = row.getValue('amount') as number;
        const currency = row.getValue('currency') as string;
        const type = row.getValue('type') as string;
        const isIncoming = [
          TransactionType.PAYMENT,
          TransactionType.DEPOSIT,
        ].includes(type as TransactionType);
        return (
          <span
            className={cn('font-medium', {
              'text-green-600': isIncoming,
              'text-red-600': !isIncoming,
            })}
          >
            {isIncoming ? '+' : '-'}
            {formatCurrency(amount, currency)}
          </span>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            variant="secondary"
            className={cn({
              'bg-green-100 text-green-800':
                status === TransactionStatus.COMPLETED,
              'bg-yellow-100 text-yellow-800':
                status === TransactionStatus.PENDING,
              'bg-red-100 text-red-800': status === TransactionStatus.FAILED,
            })}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'reference',
      header: 'Reference',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <FileText className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => onViewDetails?.(transaction)}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Calculate summary statistics
  const summary = transactions.reduce(
    (acc, transaction) => {
      const amount = transaction.amount;
      if (
        [TransactionType.PAYMENT, TransactionType.DEPOSIT].includes(
          transaction.type,
        )
      ) {
        acc.totalIncoming += amount;
      } else {
        acc.totalOutgoing += amount;
      }
      if (transaction.status === TransactionStatus.PENDING) {
        acc.pendingCount += 1;
      }
      return acc;
    },
    { totalIncoming: 0, totalOutgoing: 0, pendingCount: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Incoming
            </CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.totalIncoming, 'USD')}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Outgoing
            </CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(summary.totalOutgoing, 'USD')}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Transactions
            </CardTitle>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {summary.pendingCount}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.pendingCount} pending
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            searchKey="reference"
          />
        </CardContent>
      </Card>
    </div>
  );
}