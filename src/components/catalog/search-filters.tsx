'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const filterFormSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.array(z.string()).optional(),
  priceRange: z.array(z.number()).length(2).optional(),
  inStock: z.boolean().optional(),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

interface SearchFiltersProps {
  categories: { id: string; name: string }[];
  onFiltersChange: (filters: FilterFormValues) => void;
  defaultValues?: Partial<FilterFormValues>;
}

export function SearchFilters({
  categories,
  onFiltersChange,
  defaultValues,
}: SearchFiltersProps) {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      search: '',
      category: '',
      status: [],
      priceRange: [0, 1000],
      inStock: false,
      ...defaultValues,
    },
  });

  const onSubmit = React.useCallback(
    (data: FilterFormValues) => {
      onFiltersChange(data);
    },
    [onFiltersChange]
  );

  // Debounce form changes
  React.useEffect(() => {
    const subscription = form.watch(() => {
      const timeoutId = setTimeout(() => {
        form.handleSubmit(onSubmit)();
      }, 500);

      return () => clearTimeout(timeoutId);
    });

    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Search products..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">All Categories</SelectItem>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="status">
                <AccordionTrigger>Status</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-2">
                          {['ACTIVE', 'INACTIVE', 'OUT_OF_STOCK'].map((status) => (
                            <div
                              key={status}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                checked={field.value?.includes(status)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(field.value ?? []), status]
                                    : (field.value ?? []).filter((s) => s !== status);
                                  field.onChange(newValue);
                                }}
                              />
                              <span>{status}</span>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="priceRange"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-4">
                          <Slider
                            min={0}
                            max={1000}
                            step={10}
                            value={field.value}
                            onValueChange={field.onChange}
                          />
                          <div className="flex justify-between text-sm">
                            <span>{formatCurrency((field.value ?? [])[0])}</span>
                            <span>{formatCurrency((field.value ?? [])[1])}</span>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="stock">
                <AccordionTrigger>Stock</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="inStock"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span>In Stock Only</span>
                        </div>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="w-full"
            >
              Reset Filters
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}