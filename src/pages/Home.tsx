import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product, CartItem } from '../types';
import { getProducts } from '../services/database';

interface HomeProps {
  onAddToCart: (product: Product) => void;
  cartItems: CartItem[];
}

const Home: React.FC<HomeProps> = ({ onAddToCart, cartItems }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError(null);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="loading">🔄 Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="error-message">❌ {error}</div>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <h2>🛍️ Bienvenido a Nuestra Tienda</h2>
        <p>Descubre los mejores productos con precios increíbles</p>
      </section>

      <section className="products-grid">
        <h3>⭐ Productos Destacados</h3>
        <div className="grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
