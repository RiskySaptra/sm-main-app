'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Download,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils/inventory';

// Mock data interfaces
interface RevenueMetric {
  total: number;
  change: number;
  trend: 'up' | 'down';
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

interface ExpenseMetric {
  total: number;
  change: number;
  trend: 'up' | 'down';
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

interface ProfitMetric {
  total: number;
  margin: number;
  change: number;
  trend: 'up' | 'down';
}

interface FinancialReportsProps {
  revenue: RevenueMetric;
  expenses: ExpenseMetric;
  profit: ProfitMetric;
  period?: string;
  onPeriodChange?: (period: string) => void;
  onExport?: () => void;
}

export function FinancialReports({
  revenue,
  expenses,
  profit,
  period = 'monthly',
  onPeriodChange,
  onExport,
}: FinancialReportsProps) {
  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={onPeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Revenue Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            {revenue.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(revenue.total, 'USD')}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {revenue.trend === 'up' ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'}
              >
                {formatPercentage(Math.abs(revenue.change))}
              </span>
              <span>vs previous {period}</span>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            {expenses.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(expenses.total, 'USD')}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {expenses.trend === 'up' ? (
                <ArrowUpIcon className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-green-500" />
              )}
              <span
                className={expenses.trend === 'up' ? 'text-red-600' : 'text-green-600'}
              >
                {formatPercentage(Math.abs(expenses.change))}
              </span>
              <span>vs previous {period}</span>
            </div>
          </CardContent>
        </Card>

        {/* Profit Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            {profit.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(profit.total, 'USD')}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {profit.trend === 'up' ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={profit.trend === 'up' ? 'text-green-600' : 'text-red-600'}
              >
                {formatPercentage(Math.abs(profit.change))}
              </span>
              <span>vs previous {period}</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Profit Margin: {formatPercentage(profit.margin)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdowns */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Breakdown</TabsTrigger>
          <TabsTrigger value="expenses">Expense Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Category</CardTitle>
              <CardDescription>
                Breakdown of revenue sources for the current {period}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenue.breakdown.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="font-medium">
                        {formatCurrency(item.amount, 'USD')}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {formatPercentage(item.percentage)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
              <CardDescription>
                Breakdown of expenses for the current {period}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.breakdown.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="font-medium">
                        {formatCurrency(item.amount, 'USD')}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {formatPercentage(item.percentage)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}