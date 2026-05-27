'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';

const CartContext = createContext(undefined);

const CART_STORAGE_KEY = 'pride-and-joy-cart';

/**
 * Generate a unique id for each cart line-item based on product, size, and color.
 * Using crypto.randomUUID where available, falling back to a timestamp + random combo.
 */
function generateCartItemId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function CartProvider({ children }) {
  /* ------------------------------------------------------------------
   * State
   * ----------------------------------------------------------------*/
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  const [mounted, setMounted] = useState(false);

  const toastTimerRef = useRef(null);

  /* ------------------------------------------------------------------
   * Hydration-safe localStorage read (only runs client-side after mount)
   * ----------------------------------------------------------------*/
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Silently ignore corrupted / unavailable storage
    }
    setMounted(true);
  }, []);

  /* ------------------------------------------------------------------
   * Persist cart to localStorage whenever items change (skip first SSR render)
   * ----------------------------------------------------------------*/
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable — degrade gracefully
    }
  }, [items, mounted]);

  /* ------------------------------------------------------------------
   * Toast helper
   * ----------------------------------------------------------------*/
  const showToast = useCallback((message, type = 'success') => {
    // Clear any previous timer so rapid toasts don't collide
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({ message, type, visible: true });

    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
      toastTimerRef.current = null;
    }, 3000);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  /* ------------------------------------------------------------------
   * Cart actions
   * ----------------------------------------------------------------*/
  const addToCart = useCallback(
    (product, size, color, quantity = 1) => {
      setItems((prev) => {
        // Check if an identical line-item already exists (same product + size + color)
        const existingIndex = prev.findIndex(
          (item) =>
            item.productId === product.id &&
            item.size === size &&
            item.color === color
        );

        if (existingIndex !== -1) {
          // Increment quantity (capped at 10)
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: Math.min(updated[existingIndex].quantity + quantity, 10),
          };
          return updated;
        }

        // Otherwise add a brand-new line item
        const newItem = {
          id: generateCartItemId(),
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          color,
          quantity: Math.min(quantity, 10),
          image: product.image,
        };

        return [...prev, newItem];
      });

      showToast(`${product.name} added to cart!`, 'success');
      setIsCartOpen(true);
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (itemId) => {
      setItems((prev) => {
        const target = prev.find((item) => item.id === itemId);
        if (target) {
          showToast(`${target.name} removed from cart`, 'info');
        }
        return prev.filter((item) => item.id !== itemId);
      });
    },
    [showToast]
  );

  const updateQuantity = useCallback((itemId, newQuantity) => {
    const clamped = Math.max(1, Math.min(10, newQuantity));
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: clamped } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    showToast('Cart cleared', 'info');
  }, [showToast]);

  /* ------------------------------------------------------------------
   * Derived values
   * ----------------------------------------------------------------*/
  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const cartTotal = useMemo(
    () =>
      Math.round(
        items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
      ) / 100,
    [items]
  );

  /* ------------------------------------------------------------------
   * Context value (memoised to prevent unnecessary re-renders)
   * ----------------------------------------------------------------*/
  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      toast,
      showToast,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      toast,
      showToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to access cart state and actions.
 * Must be used within a <CartProvider>.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
