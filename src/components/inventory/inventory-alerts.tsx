'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryAlert {
  id: string;
  type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'EXPIRING' | 'PRICE_CHANGE' | 'SYSTEM';
  title: string;
  message: string;
  timestamp: string;
  status: 'UNREAD' | 'READ' | 'RESOLVED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface AlertPreference {
  type: string;
  enabled: boolean;
  description: string;
}

interface InventoryAlertsProps {
  alerts: InventoryAlert[];
  onMarkAsRead?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
}

const alertTypeConfig = {
  LOW_STOCK: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  OUT_OF_STOCK: {
    icon: AlertCircle,
    className: 'bg-red-50 border-red-200 text-red-800',
    badge: 'bg-red-100 text-red-800',
  },
  EXPIRING: {
    icon: Info,
    className: 'bg-orange-50 border-orange-200 text-orange-800',
    badge: 'bg-orange-100 text-orange-800',
  },
  PRICE_CHANGE: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800',
    badge: 'bg-blue-100 text-blue-800',
  },
  SYSTEM: {
    icon: Info,
    className: 'bg-gray-50 border-gray-200 text-gray-800',
    badge: 'bg-gray-100 text-gray-800',
  },
};

const defaultAlertPreferences: AlertPreference[] = [
  {
    type: 'Low Stock Alerts',
    enabled: true,
    description: 'Notify when items fall below minimum stock level',
  },
  {
    type: 'Out of Stock Alerts',
    enabled: true,
    description: 'Notify when items become out of stock',
  },
  {
    type: 'Expiring Stock Alerts',
    enabled: true,
    description: 'Notify about items approaching expiration date',
  },
  {
    type: 'Price Change Alerts',
    enabled: false,
    description: 'Notify about significant price changes',
  },
  {
    type: 'System Notifications',
    enabled: true,
    description: 'Receive system maintenance and update notifications',
  },
];

export function InventoryAlerts({
  alerts,
  onMarkAsRead,
  onResolve,
}: InventoryAlertsProps) {
  const [preferences, setPreferences] = React.useState(defaultAlertPreferences);

  const unreadCount = alerts.filter(
    (alert) => alert.status === 'UNREAD'
  ).length;

  const togglePreference = (index: number) => {
    setPreferences((prev) =>
      prev.map((pref, i) =>
        i === index ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alert Center</CardTitle>
              <CardDescription>
                Manage your inventory notifications
              </CardDescription>
            </div>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {unreadCount} unread
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => {
            const config = alertTypeConfig[alert.type];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  'p-4 rounded-lg border flex items-start gap-4',
                  config.className,
                  alert.status === 'UNREAD' && 'border-l-4'
                )}
              >
                <Icon className="h-5 w-5 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge
                        variant="secondary"
                        className={config.badge}
                      >
                        {alert.type.replace('_', ' ')}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={cn({
                          'bg-blue-100 text-blue-800': alert.priority === 'HIGH',
                          'bg-yellow-100 text-yellow-800':
                            alert.priority === 'MEDIUM',
                          'bg-gray-100 text-gray-800': alert.priority === 'LOW',
                        })}
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                  <div className="flex items-center gap-2 pt-2">
                    {alert.status === 'UNREAD' && onMarkAsRead && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMarkAsRead(alert.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    {alert.status !== 'RESOLVED' && onResolve && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onResolve(alert.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Alert Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Customize which alerts you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {preferences.map((preference, index) => (
            <div
              key={preference.type}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex-1">
                <Label htmlFor={`preference-${index}`} className="font-medium">
                  {preference.type}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {preference.description}
                </p>
              </div>
              <Switch
                id={`preference-${index}`}
                checked={preference.enabled}
                onCheckedChange={() => togglePreference(index)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}