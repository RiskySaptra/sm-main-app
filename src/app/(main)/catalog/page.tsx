'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCategories, mockProducts } from '@/lib/mock-data';
import { DollarSign, Package, Tag } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from './_components/page-layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CatalogDashboardPage() {
  const categoryData = mockCategories.map(category => ({
    name: category.name,
    products: category.children?.reduce((acc, child) => acc + child.productCount, 0) || 0,
  }));

  return (
    <PageLayout title="Catalog Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Package className="h-8 w-8 text-muted-foreground" />
              <p className="text-3xl font-bold">{mockProducts.length}</p>
            </div>
            <Link href="/catalog/products" className="text-sm text-muted-foreground mt-4 block">
              Manage Products
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Tag className="h-8 w-8 text-muted-foreground" />
              <p className="text-3xl font-bold">{mockCategories.length}</p>
            </div>
            <Link href="/catalog/categories" className="text-sm text-muted-foreground mt-4 block">
              Manage Categories
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <DollarSign className="h-8 w-8 text-muted-foreground" />
              <p className="text-3xl font-bold">
                ${mockProducts.reduce((acc, p) => acc + p.basePrice, 0).toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Total value of all products
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="products" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {mockProducts.slice(0, 5).map(product => (
                <li key={product.id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.status}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}