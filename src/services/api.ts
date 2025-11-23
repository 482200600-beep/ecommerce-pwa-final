// src/services/api.ts
const API_BASE_URL = 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const api = {
  // Obtener productos
  async getProducts(filters?: any): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
    return await response.json();
  },

  // Obtener producto por ID
  async getProductById(id: number): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return await response.json();
  },

  // Obtener productos destacados
  async getFeaturedProducts(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    return await response.json();
  }
};
