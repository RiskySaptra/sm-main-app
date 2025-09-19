import { Product, Category, ProductStatus } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Experience the future of mobile technology with the Samsung Galaxy S24 Ultra. Featuring a stunning Dynamic AMOLED 2X display, a pro-grade camera system with groundbreaking AI-powered features, and the fastest processor ever in a Galaxy, this phone is designed to impress.',
    basePrice: 1299.99,
    status: ProductStatus.PUBLISHED,
    categoryId: '1-1',
    images: ['https://picsum.photos/seed/s24ultra/800/800', 'https://picsum.photos/seed/s24ultra-2/800/800'],
    thumbnailUrl: 'https://picsum.photos/seed/s24ultra/400/400',
    brand: 'Samsung',
    isOnSale: true,
    salePrice: 1199.99,
    tags: ['electronics', 'featured', 'smartphone', 'samsung'],
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X',
      'Resolution': '3088 x 1440 (Quad HD+)',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'RAM': '12GB',
      'Storage': '256GB',
      'Main Camera': '200MP Wide-angle',
      'Battery': '5000mAh',
    },
  },
  {
    id: '2',
    name: 'Dell XPS 15 Laptop',
    description: 'The Dell XPS 15 is a powerhouse laptop designed for creators and professionals. It boasts a stunning 4K OLED display, a powerful Intel Core i9 processor, and a dedicated NVIDIA GeForce RTX graphics card, all in a sleek and portable design.',
    basePrice: 2499.99,
    status: ProductStatus.PUBLISHED,
    categoryId: '1-2',
    images: ['https://picsum.photos/seed/xps15/800/800'],
    thumbnailUrl: 'https://picsum.photos/seed/xps15/400/400',
    brand: 'Dell',
    tags: ['electronics', 'laptop', 'dell', 'xps'],
    specifications: {
      'Display': '15.6" 4K UHD+ OLED',
      'Processor': 'Intel Core i9-13900H',
      'Graphics': 'NVIDIA GeForce RTX 4070',
      'RAM': '32GB DDR5',
      'Storage': '1TB NVMe SSD',
    },
  },
  {
    id: '3',
    name: 'Classic Cotton T-Shirt',
    description: 'A timeless classic, this T-shirt is made from 100% premium cotton for a soft and comfortable feel. It features a classic crew neck and a modern fit, making it a versatile addition to any wardrobe.',
    basePrice: 29.99,
    status: ProductStatus.DRAFT,
    categoryId: '2-1',
    images: ['https://picsum.photos/seed/tshirt/800/800'],
    thumbnailUrl: 'https://picsum.photos/seed/tshirt/400/400',
    brand: 'Brand C',
    tags: ['clothing', 't-shirt', 'men', 'cotton'],
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    productCount: 15,
    children: [
      {
        id: '1-1',
        name: 'Smartphones',
        productCount: 8,
      },
      {
        id: '1-2',
        name: 'Laptops',
        productCount: 7,
      },
    ],
  },
  {
    id: '2',
    name: 'Clothing',
    productCount: 20,
    children: [
      {
        id: '2-1',
        name: 'Men',
        productCount: 10,
      },
      {
        id: '2-2',
        name: 'Women',
        productCount: 10,
      },
    ],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};