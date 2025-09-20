'use client';

import * as React from 'react';
import { PurchaseOrderForm } from '@/components/purchase/purchase-order-form';
import { useToast } from '@/hooks/use-toast';
import { PurchaseOrderFormValues } from '@/components/purchase/purchase-order-form';

export default function NewPurchaseOrderPage() {
  const { toast } = useToast();

  const handleCreatePurchaseOrder = (data: PurchaseOrderFormValues) => {
    console.log('Creating purchase order:', data);
    toast({
      title: 'Purchase Order Created',
      description: `Purchase order created successfully for ${data.supplierId}`,
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Create New Purchase Order</h1>
      <PurchaseOrderForm onSubmit={handleCreatePurchaseOrder} />
    </div>
  );
}