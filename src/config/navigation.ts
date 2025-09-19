import {
  ShoppingCart,
  Package,
  Users,
  Boxes,
  CreditCard,
  TrendingUp,
  Truck,
  Settings,
  Building2,
  LayoutDashboard,
} from 'lucide-react';

export const mainNavItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/catalog', icon: Package, label: 'Catalog', children: [
    { href: '/catalog/products', label: 'Products' },
    { href: '/catalog/categories', label: 'Categories' },
  ]},
  { href: '/inventory', icon: Boxes, label: 'Inventory', children: [
    { href: '/inventory/stock', label: 'Stock Levels' },
    { href: '/inventory/movements', label: 'Stock Movements' },
  ]},
  { href: '/sales', icon: ShoppingCart, label: 'Sales Orders', children: [
    { href: '/sales', label: 'New Order' },
    { href: '/sales-orders', label: 'Order List' },
  ]},
  { href: '/purchase', icon: Truck, label: 'Purchase Orders', children: [
    { href: '/purchase', label: 'New Order' },
    { href: '/purchase-orders', label: 'Order List' },
    { href: '/purchase-orders/suppliers', label: 'Suppliers' },
  ]},
  { href: '/finance', icon: CreditCard, label: 'Finance', children: [
    { href: '/finance/transactions', label: 'Transactions' },
    { href: '/finance/payments', label: 'Payments' },
    { href: '/finance/reports', label: 'Reports' },
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