'use client';

import * as React from 'react';
import {
  ChevronDown,
  ChevronRight,
  FolderPlus,
  MoreVertical,
  Edit,
  Trash,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  children?: Category[];
  productCount: number;
}

interface CategoryTreeProps {
  categories: Category[];
  onAddCategory?: (parentId: string | null) => void;
  onEditCategory?: (category: Category) => void;
  onDeleteCategory?: (category: Category) => void;
  onSelectCategory?: (category: Category) => void;
  selectedCategoryId?: string;
}

export function CategoryTree({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onSelectCategory,
  selectedCategoryId,
}: CategoryTreeProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(new Set());

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasChildren = category.children && category.children.length > 0;
    const isSelected = category.id === selectedCategoryId;

    return (
      <div key={category.id} className="select-none">
        <div
          className={cn(
            'flex items-center py-2 px-2 rounded-md hover:bg-accent cursor-pointer',
            isSelected && 'bg-accent',
          )}
          style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-background"
            onClick={() => toggleExpand(category.id)}
          >
            {hasChildren && (
              isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            )}
          </Button>
          <div
            className="flex-1 flex items-center gap-2 px-2"
            onClick={() => onSelectCategory?.(category)}
          >
            <span className="flex-1">{category.name}</span>
            <span className="text-sm text-muted-foreground">
              ({category.productCount})
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {onAddCategory && (
                <DropdownMenuItem onClick={() => onAddCategory(category.id)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add subcategory
                </DropdownMenuItem>
              )}
              {onEditCategory && (
                <DropdownMenuItem onClick={() => onEditCategory(category)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              )}
              {onDeleteCategory && (
                <DropdownMenuItem
                  onClick={() => onDeleteCategory(category)}
                  className="text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {category.children!.map((child) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        {onAddCategory && (
          <Button
            size="sm"
            onClick={() => onAddCategory(null)}
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        )}
      </div>
      <div className="space-y-1">
        {categories.map((category) => renderCategory(category))}
      </div>
    </div>
  );
}