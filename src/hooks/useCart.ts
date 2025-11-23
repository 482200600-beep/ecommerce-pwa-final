import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const useCart = () => {
  const { state, dispatch } = useApp();

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity }
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };
};
