'use client';

import { OrderCreationForm } from '@/components/sales/order-creation-form';
import { PageLayout } from '@/app/(main)/catalog/_components/page-layout';

export default function NewSalesOrderPage() {
  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };

  return (
    <PageLayout title="Create New Sales Order">
      <OrderCreationForm onSubmit={handleSubmit} />
    </PageLayout>
  );
}