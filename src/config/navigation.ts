import {
  Home,
  ShoppingCart,
  Package,
  Users,
  FileText,
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
  { href: '/sales-orders', icon: ShoppingCart, label: 'Sales Orders', children: [
    { href: '/sales-orders/new', label: 'New Order' },
    { href: '/sales-orders/list', label: 'Order List' },
  ]},
  { href: '/purchase-orders', icon: Truck, label: 'Purchase Orders', children: [
    { href: '/purchase-orders/new', label: 'New Order' },
    { href: '/purchase-orders/list', label: 'Order List' },
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
  { href: '/backoffice/reports', icon: TrendingUp, label: 'Reports' },
  { href: '/backoffice/settings', icon: Settings, label: 'Settings' },
];

export type NavItem = {
  href: string;
  icon: any;
  label: string;
  children?: { href: string; label: string }[];
};