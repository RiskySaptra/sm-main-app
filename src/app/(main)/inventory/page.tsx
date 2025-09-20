'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StockLevelsTab } from '@/components/inventory/tabs/stock-levels-tab';
import { MovementsTab } from '@/components/inventory/tabs/movements-tab';
import { AlertsTab } from '@/components/inventory/tabs/alerts-tab';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = React.useState('stock');

  const handleAddMovement = () => {
    // TODO: Implement add movement functionality
    console.log('Add movement clicked');
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
          <StockLevelsTab />
        </TabsContent>
        <TabsContent value="movements" className="mt-6">
          <MovementsTab />
        </TabsContent>
        <TabsContent value="alerts" className="mt-6">
          <AlertsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}