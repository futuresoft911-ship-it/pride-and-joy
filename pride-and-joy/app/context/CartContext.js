'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const SAMPLE_PRODUCTS = [
  {
    id: 'love-is-love-tee',
    name: 'Love is Love Tee',
    price: 34.99,
    image: '/images/love-is-love-tee.png',
    size: 'M',
    color: 'White',
  },
  {
    id: 'pride-flag-tee',
    name: 'Pride Flag Tee',
    price: 29.99,
    image: '/images/pride-flag-tee.png',
    size: 'L',
    color: 'Black',
  },
];

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pridejoy-cart');
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems(SAMPLE_PRODUCTS.map((p) => ({ ...p, quantity: 1 })));
      }
    } catch {
      setItems(SAMPLE_PRODUCTS.map((p) => ({ ...p, quantity: 1 })));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pridejoy-cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.size === product.size && i.color === product.color
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeItem = useCallback((id, size, color) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size && i.color === color)));
  }, []);

  const updateQuantity = useCallback((id, size, color, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, isLoaded }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
