// src/services/api.ts
const isProduction = import.meta.env.PROD;

// ⚠️ REEMPLAZA con tu URL real de Vercel
const PRODUCTION_URL = 'https://tu-app.vercel.app';

export const API_BASE_URL = isProduction 
  ? 'https://tu-backend.herokuapp.com/api' // ⚠️ Backend en la nube
  : 'http://localhost:5000/api'; // Backend local

export const api = {
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      
      // Fallback a datos locales si el backend no está disponible
      return {
        success: true,
        products: [
          {
            id: 1,
            name: "MacBook Pro 16\"",
            price: 2399,
            description: "Laptop profesional (datos locales)",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
            category: "Tecnología"
          }
        ]
      };
    }
  }
};
