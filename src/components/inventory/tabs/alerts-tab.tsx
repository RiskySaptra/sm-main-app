'use client';

import * as React from 'react';
import { InventoryAlerts } from '@/components/inventory/inventory-alerts';
import { Skeleton } from '@/components/ui/skeleton';

import { mockInventoryItems } from '@/lib/mocks/inventory';

interface InventoryAlert {
  id: string;
  type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'SYSTEM';
  title: string;
  message: string;
  timestamp: string;
  status: 'UNREAD' | 'READ';
  priority: 'HIGH' | 'LOW';
}

export function AlertsTab() {
  const [loading, setLoading] = React.useState(true);
  const [alerts, setAlerts] = React.useState<readonly InventoryAlert[]>([]);

  React.useEffect(() => {
    const generatedAlerts = mockInventoryItems
      .map((item) => {
        if (item.quantity <= 0) {
          return {
            id: `out-of-stock-${item.id}`,
            type: 'OUT_OF_STOCK',
            title: 'Out of Stock Alert',
            message: `${item.name} is out of stock`,
            timestamp: new Date().toISOString(),
            status: 'UNREAD',
            priority: 'HIGH',
          } as InventoryAlert;
        }
        if (item.quantity <= item.reorderPoint) {
          return {
            id: `low-stock-${item.id}`,
            type: 'LOW_STOCK',
            title: 'Low Stock Alert',
            message: `${item.name} is below the reorder point (${item.reorderPoint})`,
            timestamp: new Date().toISOString(),
            status: 'UNREAD',
            priority: 'HIGH',
          } as InventoryAlert;
        }
        return null;
      })
      .filter((alert): alert is InventoryAlert => alert !== null);

    const timer = setTimeout(() => {
      setAlerts(generatedAlerts);
      setLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const handleMarkAsRead = (alertId: string) => {
    // TODO: Implement mark as read functionality
    console.log('Mark as read:', alertId);
  };

  const handleResolveAlert = (alertId: string) => {
    // TODO: Implement resolve alert functionality
    console.log('Resolve alert:', alertId);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <InventoryAlerts
      alerts={alerts}
      onMarkAsRead={handleMarkAsRead}
      onResolve={handleResolveAlert}
    />
  );
}