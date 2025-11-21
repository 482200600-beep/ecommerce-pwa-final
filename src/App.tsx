import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import { Product, CartItem, User } from './types';
import { initGoogleAuth, handleGoogleLogin } from './services/googleAuth';
import './App.css';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Inicializar Google Auth
    initGoogleAuth();
    
    // Cargar datos del localStorage
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('user');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      let newItems: CartItem[];
      
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { product, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const handleLogin = async () => {
    try {
      const userInfo = await handleGoogleLogin();
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error al iniciar sesión');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <Header
        cartItems={cartItems}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <main>
        <Home
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />
      </main>
    </div>
  );
};

export default App;
