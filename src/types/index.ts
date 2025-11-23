export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // Precio tachado para ofertas
  description: string;
  detailedDescription: string;
  images: string[]; // Múltiples imágenes
  category: string;
  subcategory: string;
  brand: string;
  stock: number;
  sku: string;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isOnSale: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  phone?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: number[]; // IDs de productos
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  phone: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface Review {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}
