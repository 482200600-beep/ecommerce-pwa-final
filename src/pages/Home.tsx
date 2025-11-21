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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div className="home">
      <section className="hero">
        <h2>Bienvenido a Nuestra Tienda</h2>
        <p>Los mejores productos al mejor precio</p>
      </section>

      <section className="products-grid">
        <h3>Productos Destacados</h3>
        <div className="grid">
          {products.map(product => (
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
