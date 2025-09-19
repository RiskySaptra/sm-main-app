'use client';

import * as React from 'react'; 
import { SupplierManagement } from '@/components/purchase/supplier-management';
import { PurchaseOrderForm } from '@/components/purchase/purchase-order-form';
import { PurchaseOrderReceiving } from '@/components/purchase/purchase-order-receiving';
import { useToast } from '@/hooks/use-toast';
import { PurchaseOrderData, Supplier } from '@/lib/types';
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
    contactPerson: 'John Doe',
    email: 'john.doe@suppliera.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    category: 'Raw Materials',
    status: 'ACTIVE',
    rating: 4.5,
    paymentTerms: 'Net 30',
    preferredSupplier: true,
  },
  {
    id: '2',
    name: 'Supplier B',
    contactPerson: 'Jane Smith',
    email: 'jane.smith@supplierb.com',
    phone: '098-765-4321',
    address: '456 Oak Ave, Othertown, USA',
    category: 'Packaging',
    status: 'INACTIVE',
    rating: 3.8,
    paymentTerms: 'Net 60',
    preferredSupplier: false,
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
      qualityStatus: 'pass' | 'fail';
      notes?: string;
    }
  ) => {
    console.log('Receiving items:', { orderId, itemId, data });
    const status = data.qualityStatus === 'pass' ? 'accepted' : 'rejected';
    toast({
      title: 'Items Received',
      description: `${data.receivedQuantity} items ${status} for order ${orderId}`,
      variant: data.qualityStatus === 'pass' ? 'default' : 'destructive',
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