import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  actionButtonText?: string;
  onActionButtonClick?: () => void;
}

export function PageHeader({ title, actionButtonText, onActionButtonClick }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      {actionButtonText && onActionButtonClick && (
        <Button onClick={onActionButtonClick}>
          <Plus className="mr-2 h-4 w-4" />
          {actionButtonText}
        </Button>
      )}
    </div>
  );
}