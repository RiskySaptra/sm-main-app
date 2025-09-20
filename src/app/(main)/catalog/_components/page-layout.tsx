import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface PageLayoutProps {
  title: string;
  action?: {
    href: string;
    label: string;
  };
  children: React.ReactNode;
}

export function PageLayout({ title, action, children }: PageLayoutProps) {
  return (
    <div className="mx-auto py-5">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        {action && (
          <Link href={action.href}>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}