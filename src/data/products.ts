export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  bulkPrice?: number;
  minBulkQuantity?: number;
  stock: number;
  category: string;
  tags: string[];
  images: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export const categories = [
  'Dinner Sets',
  'Serving Trays',
  'Storage Boxes',
  'Wooden Toys',
  'Gift Baskets',
  'Drinkware',
  'Kitchen Accessories',
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Shisham Dinner Set',
    description:
      'Handcrafted 6-piece dinner set made from premium shisham wood. Perfect for family dining with elegant design and durable construction.',
    price: 3500,
    bulkPrice: 2800,
    minBulkQuantity: 10,
    stock: 25,
    category: 'Dinner Sets',
    tags: ['premium', 'shisham', 'family', 'dining'],
    images: [
      'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: true,
    rating: 4.8,
    reviewCount: 42,
    specifications: {
      Material: 'Shisham Wood',
      Finish: 'Natural Oil Finish',
      'Set Includes': '6 Plates, 6 Bowls',
      Care: 'Hand Wash Only',
      Warranty: '1 Year',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Round Serving Tray - Neem Wood',
    description:
      'Beautiful round serving tray crafted from natural neem wood. Antibacterial properties make it perfect for serving food.',
    price: 1200,
    bulkPrice: 950,
    minBulkQuantity: 20,
    stock: 40,
    category: 'Serving Trays',
    tags: ['neem', 'antibacterial', 'serving', 'round'],
    images: [
      'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: true,
    rating: 4.6,
    reviewCount: 28,
    specifications: {
      Material: 'Neem Wood',
      Diameter: '12 inches',
      Thickness: '1 inch',
      Finish: 'Food-safe Lacquer',
      Weight: '400g',
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Chapati Storage Box - Saal Wood',
    description:
      'Traditional chapati storage box made from durable saal wood. Keeps chapatis warm and fresh for hours.',
    price: 850,
    bulkPrice: 680,
    minBulkQuantity: 25,
    stock: 60,
    category: 'Storage Boxes',
    tags: ['saal', 'chapati', 'storage', 'traditional'],
    images: [
      'https://images.pexels.com/photos/6186/wood-nature-forest-bridge.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6186/wood-nature-forest-bridge.jpg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: false,
    rating: 4.5,
    reviewCount: 35,
    specifications: {
      Material: 'Saal Wood',
      Capacity: '15-20 Chapatis',
      Dimensions: '10" x 10" x 3"',
      Handle: 'Ergonomic Design',
      Care: 'Wipe Clean',
    },
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '4',
    name: 'Dry Fruit Gift Box Set - Sandel Wood',
    description:
      'Elegant gift box set with multiple compartments for dry fruits and nuts. Perfect for festivals and celebrations.',
    price: 2200,
    bulkPrice: 1800,
    minBulkQuantity: 15,
    stock: 30,
    category: 'Gift Baskets',
    tags: ['gift', 'dry-fruits', 'festival', 'food', 'compartments'],
    images: [
      'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: true,
    rating: 4.7,
    reviewCount: 18,
    specifications: {
      Material: 'Mixed Wood (Shisham & Neem)',
      Compartments: '6 Sections',
      Dimensions: '12" x 8" x 2"',
      Lid: 'Sliding Wooden Lid',
      Occasion: 'Festivals, Gifts',
    },
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '5',
    name: 'Wooden Educational Toy Set',
    description:
      'Safe and educational wooden toy set for children. Includes puzzles, blocks, and learning games.',
    price: 1500,
    bulkPrice: 1200,
    minBulkQuantity: 30,
    stock: 45,
    category: 'Wooden Toys',
    tags: ['educational', 'safe', 'children', 'learning'],
    images: [
      'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: false,
    rating: 4.9,
    reviewCount: 52,
    specifications: {
      Material: 'Safe Painted Wood',
      'Age Group': '3-8 Years',
      Pieces: '15 Educational Items',
      Safety: 'Non-toxic Paint',
      Certification: 'Child Safe',
    },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '6',
    name: 'Glass-Wood Water Jug',
    description:
      'Elegant combination of glass and wood. Borosilicate glass jug with wooden handle and base.',
    price: 980,
    bulkPrice: 780,
    minBulkQuantity: 40,
    stock: 35,
    category: 'Drinkware',
    tags: ['glass', 'wood', 'water', 'elegant'],
    images: [
      'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: true,
    rating: 4.4,
    reviewCount: 23,
    specifications: {
      Glass: 'Borosilicate Glass',
      Wood: 'Teak Wood Handle',
      Capacity: '1.5 Liters',
      Temperature: 'Heat Resistant',
      Dishwasher: 'Glass Part Only',
    },
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '7',
    name: 'Spice Storage Rack',
    description:
      'Multi-tier spice storage rack with individual wooden containers. Keeps spices organized and fresh.',
    price: 1800,
    bulkPrice: 1440,
    minBulkQuantity: 20,
    stock: 28,
    category: 'Kitchen Accessories',
    tags: ['spice', 'storage', 'organized', 'kitchen'],
    images: [
      'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: false,
    rating: 4.3,
    reviewCount: 31,
    specifications: {
      Material: 'Shisham Wood',
      Containers: '12 Small Jars',
      Dimensions: '15" x 8" x 12"',
      Mounting: 'Wall Mount or Counter',
      Lids: 'Airtight Wooden Lids',
    },
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '8',
    name: 'Rectangular Serving Platter',
    description:
      'Large rectangular serving platter perfect for parties and gatherings. Elegant design with raised edges.',
    price: 1650,
    bulkPrice: 1320,
    minBulkQuantity: 18,
    stock: 22,
    category: 'Serving Trays',
    tags: ['rectangular', 'large', 'party', 'elegant'],
    images: [
      'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: false,
    rating: 4.6,
    reviewCount: 19,
    specifications: {
      Material: 'Premium Shisham',
      Dimensions: '16" x 10" x 1"',
      Design: 'Raised Edge',
      Finish: 'Smooth Lacquer',
      Use: 'Indoor & Outdoor',
    },
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
