import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop Gaming Profesional",
    price: 1200,
    description: "Laptop potente para gaming y trabajo con tarjeta gráfica RTX 4060",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
    category: "Tecnología"
  },
  {
    id: 2,
    name: "Smartphone Android",
    price: 450,
    description: "Teléfono inteligente de última generación con 128GB almacenamiento",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    category: "Tecnología"
  },
  {
    id: 3,
    name: "Auriculares Inalámbricos",
    price: 89,
    description: "Auriculares Bluetooth con cancelación de ruido activa",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    category: "Audio"
  },
  {
    id: 4,
    name: "Smartwatch Deportivo",
    price: 199,
    description: "Reloj inteligente con monitor de ritmo cardíaco y GPS",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    category: "Tecnología"
  },
  {
    id: 5,
    name: "Tablet 10 Pulgadas",
    price: 299,
    description: "Tablet perfecta para trabajo y entretenimiento",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80",
    category: "Tecnología"
  },
  {
    id: 6,
    name: "Cámara Digital 4K",
    price: 599,
    description: "Cámara profesional para fotografía y video",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
    category: "Fotografía"
  }
];

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
