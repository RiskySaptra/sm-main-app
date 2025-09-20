'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StockLevels } from '@/components/inventory/stock-levels';
import { StockMovement } from '@/components/inventory/stock-movement';
import { InventoryAlerts } from '@/components/inventory/inventory-alerts';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { mockInventoryItems, mockStockMovements } from '@/lib/mock-data';

const mockAlerts = [
  {
    id: '1',
    type: 'LOW_STOCK',
    title: 'Low Stock Alert',
    message: 'Product B is below minimum stock level',
    timestamp: '2024-03-15T09:30:00Z',
    status: 'UNREAD',
    priority: 'HIGH',
  },
  {
    id: '2',
    type: 'OUT_OF_STOCK',
    title: 'Out of Stock Alert',
    message: 'Product C is out of stock',
    timestamp: '2024-03-15T08:45:00Z',
    status: 'UNREAD',
    priority: 'HIGH',
  },
  {
    id: '3',
    type: 'SYSTEM',
    title: 'System Notification',
    message: 'Inventory system maintenance scheduled for tonight',
    timestamp: '2024-03-15T08:00:00Z',
    status: 'READ',
    priority: 'LOW',
  },
] as const;

export default function InventoryPage() {
  const [activeTab, setActiveTab] = React.useState('stock');

  const handleAddMovement = () => {
    // TODO: Implement add movement functionality
    console.log('Add movement clicked');
  };

  const handleMarkAsRead = (alertId: string) => {
    // TODO: Implement mark as read functionality
    console.log('Mark as read:', alertId);
  };

  const handleResolveAlert = (alertId: string) => {
    // TODO: Implement resolve alert functionality
    console.log('Resolve alert:', alertId);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage your inventory levels, movements, and alerts
          </p>
        </div>
        <Button onClick={handleAddMovement}>
          <Plus className="h-4 w-4 mr-2" />
          Add Movement
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="stock">Stock Levels</TabsTrigger>
          <TabsTrigger value="movements">Movements</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="stock" className="mt-6">
          <StockLevels items={mockInventoryItems} />
        </TabsContent>
        <TabsContent value="movements" className="mt-6">
          <StockMovement
            movements={mockStockMovements}
            onAddMovement={handleAddMovement}
          />
        </TabsContent>
        <TabsContent value="alerts" className="mt-6">
          <InventoryAlerts
            alerts={mockAlerts}
            onMarkAsRead={handleMarkAsRead}
            onResolve={handleResolveAlert}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}