'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Product, ProductStatus } from '@/lib/types';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { PlusCircle, Trash2 } from 'lucide-react';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  basePrice: z.coerce.number().min(0, 'Price must be a positive number'),
  status: z.nativeEnum(ProductStatus),
  categoryId: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  isOnSale: z.boolean(),
  salePrice: z.coerce.number().optional(),
  tags: z.array(z.string()).optional(),
  specifications: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
  variants: z.array(z.object({
    sku: z.string(),
    name: z.string(),
    price: z.coerce.number(),
    stock: z.coerce.number(),
  })).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const form = useForm<FormValues>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      ...product,
      specifications: product?.specifications
        ? Object.entries(product.specifications).map(([key, value]) => ({
            key,
            value: String(value),
          }))
        : [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const { fields: specificationFields, append: appendSpecification, remove: removeSpecification } = useFieldArray({
    control: form.control,
    name: 'specifications',
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const specificationsObject = data.specifications?.reduce(
      (obj, item) => {
        obj[item.key] = item.value;
        return obj;
      },
      {} as Record<string, string>
    );

    const submissionData = {
      ...data,
      specifications: specificationsObject,
    };

    console.log(submissionData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/catalog/products');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Fill in the details of the product.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description')} />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basePrice">Base Price</Label>
                <Input
                  id="basePrice"
                  type="number"
                  {...register('basePrice')}
                />
                {errors.basePrice && (
                  <p className="text-red-500 text-sm">
                    {errors.basePrice.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="salePrice">Sale Price</Label>
                <Input
                  id="salePrice"
                  type="number"
                  {...register('salePrice')}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 mb-2">
                <Label>Key</Label>
                <Label>Value</Label>
                <span />
              </div>
              <div className="space-y-4">
                {specificationFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-[1fr_1fr_auto] items-center gap-4">
                    <Input
                      {...register(`specifications.${index}.key`)}
                      placeholder="Key"
                    />
                    <Input
                      {...register(`specifications.${index}.value`)}
                      placeholder="Value"
                    />
                    <Button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      variant="ghost"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => appendSpecification({ key: '', value: '' })}
                variant="outline"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Specification
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center gap-4 mb-2">
                <Label>SKU</Label>
                <Label>Variant Name</Label>
                <Label>Price</Label>
                <Label>Stock</Label>
                <span />
              </div>
              <div className="space-y-4">
                {variantFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] items-center gap-4">
                    <Input {...register(`variants.${index}.sku`)} placeholder="SKU" />
                    <Input {...register(`variants.${index}.name`)} placeholder="Variant Name" />
                    <Input {...register(`variants.${index}.price`)} placeholder="Price" type="number" />
                    <Input {...register(`variants.${index}.stock`)} placeholder="Stock" type="number" />
                    <Button type="button" onClick={() => removeVariant(index)} variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" onClick={() => appendVariant({ sku: '', name: '', price: 0, stock: 0 })} variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Variant
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={product?.status}
                  onValueChange={(value) =>
                    form.setValue('status', value as ProductStatus)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ProductStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="categoryId">Category</Label>
                <Input id="categoryId" {...register('categoryId')} />
                {errors.categoryId && (
                  <p className="text-red-500 text-sm">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" {...register('brand')} />
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  {...register('tags')}
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  );
}