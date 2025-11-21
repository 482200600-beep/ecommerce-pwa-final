import { Product, User } from '../types';

// Base de datos simulada
export const products: Product[] = [
  {
    id: 1,
    name: "Laptop Gaming",
    price: 1200,
    description: "Laptop potente para gaming",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    category: "Tecnología"
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    description: "Teléfono inteligente de última generación",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "Tecnología"
  },
  {
    id: 3,
    name: "Auriculares Bluetooth",
    price: 150,
    description: "Auriculares inalámbricos con cancelación de ruido",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Audio"
  }
];

// Simulación de API
export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
};

export const getProductById = (id: number): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(product => product.id === id));
    }, 300);
  });
};
