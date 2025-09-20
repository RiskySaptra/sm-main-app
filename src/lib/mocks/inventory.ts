import {
  InventoryItem,
  ItemStatus,
} from '@/app/(main)/inventory/_lib/types';
import { mockProducts, mockCategories } from './products';

export const mockInventoryItems: InventoryItem[] = mockProducts.flatMap(
  (product): InventoryItem[] => {
    if (product.hasVariants && product.variants) {
      return product.variants.map((variant, index) => {
        const category = mockCategories
          .flatMap((c) => (c.children ? [c, ...c.children] : [c]))
          .find((c) => c.id === product.categoryId);

        const item: InventoryItem = {
          id: variant.id,
          sku: variant.sku,
          storeId: variant.storeId,
          name: variant.name,
          description: product.description,
          price: variant.price,
          quantity: variant.stock,
          reorderPoint: 10,
          optimalStock: 50,
          status:
            variant.stock > 0 ? ItemStatus.ACTIVE : ItemStatus.OUT_OF_STOCK,
          categories: category ? [category.name] : [],
          tags: product.tags || [],
          reservedQuantity: variant.reservedStock,
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
          batches: [
            {
              id: `BATCH-${variant.sku}`,
              inventoryItemId: variant.id,
              batchNumber: `B-${variant.sku}`,
              expiryDate: new Date('2025-12-31T00:00:00Z'),
              quantity: index < 2 ? 5 : variant.stock,
              createdAt: new Date(),
            },
          ],
        };
        return item;
      });
    }
    // Handle products without variants
    const category = mockCategories
      .flatMap((c) => (c.children ? [c, ...c.children] : [c]))
      .find((c) => c.id === product.categoryId);
    const item: InventoryItem = {
      id: product.id,
      sku: `SKU-${product.id}`,
      storeId: 'STORE-1',
      name: product.name,
      description: product.description,
      price: product.basePrice,
      quantity: 50, // Default stock for non-variant products
      reorderPoint: 10,
      optimalStock: 50,
      status: ItemStatus.ACTIVE,
      categories: category ? [category.name] : [],
      tags: product.tags || [],
      reservedQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      batches: [
        {
          id: `BATCH-SKU-${product.id}`,
          inventoryItemId: product.id,
          batchNumber: `B-SKU-${product.id}`,
          expiryDate: new Date('2025-12-31T00:00:00Z'),
          quantity: 50,
          createdAt: new Date(),
        },
      ],
    };
    return [item];
  }
);
