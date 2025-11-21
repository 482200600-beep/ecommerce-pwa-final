import React from 'react';
import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  user: any;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, user, onLogin, onLogout }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="logo">
        <h1> Mi Tienda</h1>
      </div>
      
      <nav className="nav">
        <div className="cart-info">
           Carrito ({totalItems})
        </div>
        
        <div className="user-section">
          {user ? (
            <div className="user-menu">
              <img src={user.picture} alt={user.name} className="user-avatar" />
              <span>Hola, {user.name}</span>
              <button onClick={onLogout}>Cerrar Sesión</button>
            </div>
          ) : (
            <button onClick={onLogin} className="login-btn">
              Iniciar con Google
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
