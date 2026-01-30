import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartState {
  cartItems: CartItem[];
}

type CartAction =
  | { type: 'CART_ADD_ITEM'; payload: CartItem }
  | { type: 'CART_REMOVE_ITEM'; payload: string }
  | { type: 'CART_CLEAR' };

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
};

const CartContext = createContext<{
  state: CartState;
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case 'CART_REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };
    case 'CART_CLEAR':
        return {
            ...state,
            cartItems: []
        };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product: Product, qty: number) => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, qty },
    });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: id });
  };
  
  const clearCart = () => {
      dispatch({ type: 'CART_CLEAR' });
  }

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};