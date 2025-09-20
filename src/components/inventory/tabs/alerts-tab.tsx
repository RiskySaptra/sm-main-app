'use client';

import * as React from 'react';
import { InventoryAlerts } from '@/components/inventory/inventory-alerts';
import { Skeleton } from '@/components/ui/skeleton';

interface InventoryAlert {
  id: string;
  type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'SYSTEM';
  title: string;
  message: string;
  timestamp: string;
  status: 'UNREAD' | 'READ';
  priority: 'HIGH' | 'LOW';
}

const mockAlerts: readonly InventoryAlert[] = [
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
];

export function AlertsTab() {
  const [loading, setLoading] = React.useState(true);
  const [alerts, setAlerts] = React.useState<readonly InventoryAlert[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts(mockAlerts);
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