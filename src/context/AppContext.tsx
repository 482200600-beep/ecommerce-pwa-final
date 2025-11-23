import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, User, Order, Address } from '../types';

// Estado global de la aplicación
interface AppState {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  products: Product[];
  wishlist: number[];
  loading: boolean;
  filters: ProductFilters;
}

interface ProductFilters {
  category: string;
  priceRange: [number, number];
  rating: number;
  searchQuery: string;
  sortBy: 'name' | 'price' | 'rating' | 'newest';
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: number }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'CREATE_ORDER'; payload: Order }
  | { type: 'SET_FILTERS'; payload: Partial<ProductFilters> };

const initialState: AppState = {
  user: null,
  cart: [],
  orders: [],
  products: [],
  wishlist: [],
  loading: false,
  filters: {
    category: '',
    priceRange: [0, 10000],
    rating: 0,
    searchQuery: '',
    sortBy: 'newest'
  }
};

// Reducer para manejar estado global
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload)
      };
    
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'CREATE_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: [] // Limpiar carrito después de orden
      };
    
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    
    default:
      return state;
  }
}

// Crear contexto
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider del contexto
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persistir carrito y wishlist en localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        cartData.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_TO_CART', payload: item });
        });
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    
    if (savedWishlist) {
      try {
        const wishlistData = JSON.parse(savedWishlist);
        wishlistData.forEach((productId: number) => {
          dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
        });
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};
