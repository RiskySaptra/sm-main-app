'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Building2,
  Download,
  Filter,
  MoreVertical,
  Plus,
  Star,
  StarOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Supplier, SupplierStatus } from '@/app/(main)/purchase/_lib/types';
import { mockSuppliers } from '@/lib/mock-data';

// Form schema
const supplierFormSchema = z.object({
  name: z.string().min(2, 'Supplier name is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  paymentTerms: z.string().min(1, 'Payment terms are required'),
});

type SupplierFormValues = z.infer<typeof supplierFormSchema>;

interface SupplierManagementProps {
  suppliers: Supplier[];
  onAddSupplier: (data: SupplierFormValues) => void;
  onUpdateSupplier: (id: string, data: Partial<Supplier>) => void;
  onExport?: () => void;
}

export function SupplierManagement({
  suppliers,
  onAddSupplier,
  onUpdateSupplier,
  onExport,
}: SupplierManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
  });

  const columns: ColumnDef<Supplier>[] = [
    {
      accessorKey: 'name',
      header: 'Supplier Name',
      cell: ({ row }) => {
        const supplier = row.original;
        return (
          <div className="flex items-center gap-2">
            {supplier.rating > 4 && (
              <Star className="h-4 w-4 text-yellow-500" />
            )}
            <span>{supplier.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'contactPerson',
      header: 'Contact Person',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'categories',
      header: 'Category',
      cell: ({ row }) => {
        const categories = row.getValue('categories') as string[] | undefined;
        return (
          <div className="flex flex-wrap gap-1">
            {categories?.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                {category}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            variant="secondary"
            className={cn({
              'bg-green-100 text-green-800': status === 'ACTIVE',
              'bg-red-100 text-red-800': status === 'INACTIVE',
            })}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => {
        const rating = row.getValue('rating') as number;
        return (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn('h-4 w-4', {
                  'text-yellow-500 fill-yellow-500': index < rating,
                  'text-gray-300': index >= rating,
                })}
              />
            ))}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const supplier = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  onUpdateSupplier(supplier.id, {
                    rating: supplier.rating > 4 ? 3 : 5,
                  })
                }
              >
                {supplier.rating > 4 ? (
                  <>
                    <StarOff className="mr-2 h-4 w-4" />
                    Remove Preferred Status
                  </>
                ) : (
                  <>
                    <Star className="mr-2 h-4 w-4" />
                    Mark as Preferred
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  onUpdateSupplier(supplier.id, {
                    status:
                      supplier.status === 'ACTIVE'
                        ? SupplierStatus.INACTIVE
                        : SupplierStatus.ACTIVE,
                  })
                }
              >
                {supplier.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleSubmit = (data: SupplierFormValues) => {
    onAddSupplier(data);
    setIsAddDialogOpen(false);
    form.reset();
  };

  // Calculate summary statistics
  const summary = suppliers.reduce(
    (acc, supplier) => {
      if (supplier.status === 'ACTIVE') acc.active += 1;
      if (supplier.rating > 4) acc.preferred += 1;
      acc.total += 1;
      return acc;
    },
    { total: 0, active: 0, preferred: 0 },
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Suppliers
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Suppliers
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {summary.active}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.active}</div>
            <p className="text-xs text-muted-foreground">
              {((summary.active / summary.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Preferred Suppliers
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.preferred}</div>
            <p className="text-xs text-muted-foreground">
              {((summary.preferred / summary.total) * 100).toFixed(1)}% of
              total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Suppliers</CardTitle>
          <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Supplier
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Supplier</DialogTitle>
                  <DialogDescription>
                    Enter the supplier details below.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Supplier Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter supplier name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter contact person name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter email address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter supplier address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                field.onChange([value])
                              }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="raw_materials">
                                  Raw Materials
                                </SelectItem>
                                <SelectItem value="packaging">
                                  Packaging
                                </SelectItem>
                                <SelectItem value="equipment">
                                  Equipment
                                </SelectItem>
                                <SelectItem value="services">
                                  Services
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="paymentTerms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Terms</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select terms" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="net_30">Net 30</SelectItem>
                                <SelectItem value="net_60">Net 60</SelectItem>
                                <SelectItem value="net_90">Net 90</SelectItem>
                                <SelectItem value="immediate">
                                  Immediate
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Supplier</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="icon" onClick={onExport}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={suppliers}
            searchKey="name"
          />
        </CardContent>
      </Card>
    </div>
  );
}