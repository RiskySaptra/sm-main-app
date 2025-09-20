import {
  ShoppingCart,
  Package,
  Users,
  Boxes,
  CreditCard,
  TrendingUp,
  Truck,
  Building2,
  LayoutDashboard,
} from 'lucide-react';

export const mainNavItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/catalog', icon: Package, label: 'Catalog', children: [
    { href: '/catalog/products', label: 'Products' },
    { href: '/catalog/categories', label: 'Categories' },
  ]},
  { href: '/inventory', icon: Boxes, label: 'Inventory' },
  { href: '/sales-orders', icon: ShoppingCart, label: 'Sales Orders', children: [
    { href: '/sales', label: 'New Order' },
    { href: '/sales-orders', label: 'Order List' },
  ]},
  { href: '/purchase/orders', icon: Truck, label: 'Purchase Order', children: [
    { href: '/purchase', label: 'Dashboard' },
    { href: '/purchase/new', label: 'New Order' },
    { href: '/purchase/orders', label: 'Order List' },
  ]},
  { href: '/finance', icon: CreditCard, label: 'Finance', children: [
    { href: '/finance/transactions', label: 'Transactions' },
  ]},
];

export const backofficeNavItems = [
  { href: '/backoffice/stores', icon: Building2, label: 'Stores' },
  { href: '/backoffice/users', icon: Users, label: 'Users' },
  { href: '/backoffice/invoices', icon: TrendingUp, label: 'Invoices' },
];

export type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
  children?: { href: string; label: string }[];
};