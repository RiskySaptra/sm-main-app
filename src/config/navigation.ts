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
  Settings,
  User,
  HelpCircle,
} from 'lucide-react';

export const mainNavItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/catalog', icon: Package, label: 'Catalog', children: [
    { href: '/catalog/products', label: 'Products' },
    { href: '/catalog/categories', label: 'Categories' },
  ]},
  { href: '/inventory', icon: Boxes, label: 'Inventory', children: [
    { href: '/inventory', label: 'Inventory Overview' },
    { href: '/inventory/stock-levels', label: 'Stock Levels' },
    { href: '/inventory/batches', label: 'Batches' },
    { href: '/inventory/movements', label: 'Movements' },
  ]},
  { href: '/sales-orders', icon: ShoppingCart, label: 'Sales Orders', children: [
    { href: '/sales', label: 'Order Overview' },
    { href: '/sales-orders', label: 'Order List' },
    { href: '/sales-orders/fulfillment', label: 'Fulfillment' },
    { href: '/sales/pos', label: 'POS' },
  ]},
  { href: '/purchase/orders', icon: Truck, label: 'Purchase Order', children: [
    { href: '/purchase', label: 'Purchase Overview' },
    { href: '/purchase/orders', label: 'Order List' },
    { href: '/purchase/receive', label: 'Receive' },
  ]},
  { href: '/suppliers', icon: Building2, label: 'Suppliers' },
  { href: '/finance', icon: CreditCard, label: 'Finance', children: [
    { href: '/finance/transactions', label: 'Transactions' },
  ]},
];

export const backofficeNavItems = [
  // { href: '/backoffice', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/backoffice/stores', icon: Building2, label: 'Stores' },
  { href: '/backoffice/users', icon: Users, label: 'Users' },
  { href: '/backoffice/invoices', icon: TrendingUp, label: 'Invoices' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/help', icon: HelpCircle, label: 'Help' },
];

export type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
  children?: { href: string; label: string }[];
};