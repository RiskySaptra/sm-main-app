'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MovementType } from '@/app/(main)/inventory/_lib/types';
import { mockInventoryItems } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface FormValues {
  inventoryItemId: string;
  type: MovementType;
  quantity: number;
  unitPrice?: number;
  referenceNumber?: string;
  sourceLocation?: string;
  destinationLocation?: string;
  notes?: string;
  performedBy: string;
}

export default function NewMovementPage() {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: 'Movement Added',
      description: 'The new stock movement has been successfully recorded.',
      variant: 'success',
    });
    router.push('/inventory');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Add Stock Movement</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Movement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inventoryItemId">Inventory Item</Label>
                <Select
                  onValueChange={(value) => setValue('inventoryItemId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInventoryItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Movement Type</Label>
                <Select onValueChange={(value) => setValue('type', value as MovementType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MovementType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" {...register('quantity')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitPrice">Unit Price</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  {...register('unitPrice')}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input id="referenceNumber" {...register('referenceNumber')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sourceLocation">Source Location</Label>
                <Input id="sourceLocation" {...register('sourceLocation')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationLocation">
                  Destination Location
                </Label>
                <Input
                  id="destinationLocation"
                  {...register('destinationLocation')}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" {...register('notes')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="performedBy">Performed By</Label>
              <Input id="performedBy" {...register('performedBy')} />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Movement'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}