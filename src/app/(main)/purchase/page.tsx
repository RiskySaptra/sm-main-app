'use client';

import * as React from 'react'; 
import { SupplierManagement } from '@/components/purchase/supplier-management';
import { PurchaseOrderForm } from '@/components/purchase/purchase-order-form';
import { PurchaseOrderReceiving } from '@/components/purchase/purchase-order-receiving';
import { useToast } from '@/hooks/use-toast';
import { PurchaseOrderData } from '@/lib/types';
import {
  Supplier,
  SupplierStatus,
} from '@/app/(main)/purchase/_lib/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';

interface SupplierData {
  name: string;
  [key: string]: unknown;
}

// Mock data
const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Supplier A',
    storeId: 'STORE-1',
    code: 'SUP-A',
    contactPerson: 'John Doe',
    email: 'john.doe@suppliera.com',
    phone: '123-456-7890',
    address: {
      street: '123 Supplier St',
      city: 'Supply City',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    status: SupplierStatus.ACTIVE,
    categories: ['Raw Materials'],
    rating: 4.5,
    createdAt: new Date('2023-01-15T09:00:00Z'),
    updatedAt: new Date('2023-01-15T09:00:00Z'),
    totalOrderValue: 15000,
    orderCount: 10,
  },
  {
    id: '2',
    name: 'Supplier B',
    storeId: 'STORE-1',
    code: 'SUP-B',
    contactPerson: 'Jane Smith',
    email: 'jane.smith@supplierb.com',
    phone: '098-765-4321',
    address: {
      street: '456 Supplier Ave',
      city: 'Supply City',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    status: SupplierStatus.INACTIVE,
    categories: ['Packaging'],
    rating: 3.8,
    createdAt: new Date('2023-02-20T10:00:00Z'),
    updatedAt: new Date('2023-02-20T10:00:00Z'),
    totalOrderValue: 25000,
    orderCount: 15,
  },
];

export default function PurchasePage() {
  const { toast } = useToast();

  const handleAddSupplier = (data: SupplierData) => {
    console.log('Adding supplier:', data);
    toast({
      title: 'Supplier Added',
      description: `${data.name} has been added as a new supplier.`,
    });
  };

  const handleUpdateSupplier = (id: string, data: Partial<Supplier>) => {
    console.log(`Updating supplier ${id}:`, data);
    toast({
      title: 'Supplier Updated',
      description: `Supplier ${id} has been updated.`,
    });
  };

  // Handler for creating new purchase orders
  const handleCreatePurchaseOrder = (data: PurchaseOrderData) => {
    console.log('Creating purchase order:', data);
    toast({
      title: 'Purchase Order Created',
      description: `Purchase order created successfully for ${data.supplierId}`,
    });
  };

  // Handler for receiving purchase order items
  const handleReceiveItems = (
    orderId: string,
    itemId: string,
    data: {
      receivedQuantity: number;
      qualityStatus: 'RECEIVED' | 'REJECTED';
      notes?: string;
    }
  ) => {
    console.log('Receiving items:', { orderId, itemId, data });
    const status =
      data.qualityStatus === 'RECEIVED' ? 'accepted' : 'rejected';
    toast({
      title: 'Items Received',
      description: `${data.receivedQuantity} items ${status} for order ${orderId}`,
      variant: data.qualityStatus === 'RECEIVED' ? 'default' : 'destructive',
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Purchase Management</h1>

      <Tabs defaultValue="suppliers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suppliers">Supplier Management</TabsTrigger>
          <TabsTrigger value="create">Create Purchase Order</TabsTrigger>
          <TabsTrigger value="receive">Receive & Track</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <SupplierManagement
            suppliers={mockSuppliers}
            onAddSupplier={handleAddSupplier}
            onUpdateSupplier={handleUpdateSupplier}
          />
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <PurchaseOrderForm onSubmit={handleCreatePurchaseOrder} />
        </TabsContent>

        <TabsContent value="receive" className="space-y-4">
          <PurchaseOrderReceiving onReceiveItems={handleReceiveItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
}