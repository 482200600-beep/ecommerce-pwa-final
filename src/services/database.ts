// src/services/database.ts
import { api } from './api';
import { Product } from '../types';

// Reemplazar la base de datos simulada con llamadas reales a la API
export const getProducts = async (filters?: any): Promise<Product[]> => {
  const response = await api.getProducts(filters);
  if (response.success && response.data) {
    return response.data.products;
  }
  throw new Error(response.error || 'Error al cargar productos');
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  const response = await api.getProductById(id);
  if (response.success && response.data) {
    return response.data.product;
  }
  throw new Error(response.error || 'Error al cargar producto');
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await api.getFeaturedProducts();
  if (response.success && response.data) {
    return response.data.products;
  }
  throw new Error(response.error || 'Error al cargar productos destacados');
};
