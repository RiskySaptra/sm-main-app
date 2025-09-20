'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavItems, backofficeNavItems, type NavItem } from '@/config/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';

const NavItemComponent = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const pathname = usePathname();

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const buttonContent = (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-between",
        isActive && "bg-primary/10 text-primary"
      )}
      onClick={handleToggle}
    >
      <span className="flex items-center">
        <item.icon className="mr-2 h-4 w-4" />
        {item.label}
      </span>
      {hasChildren && (
        <span className="ml-auto">
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </span>
      )}
    </Button>
  );

  return (
    <div>
      {hasChildren ? (
        buttonContent
      ) : (
        <Link href={item.href}>
          {buttonContent}
        </Link>
      )}
      {hasChildren && isOpen && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children?.map((child) => (
            <Link key={child.href} href={child.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start pl-6 my-1",
                  pathname === child.href && "bg-primary/10 text-primary"
                )}
              >
                {child.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Store Management</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {mainNavItems.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
            />
          ))}
          <Separator className="my-4" />
          <p className="text-sm font-bold text-muted-foreground mb-2">Administration</p>
          {backofficeNavItems.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;