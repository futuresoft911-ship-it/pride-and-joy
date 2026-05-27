'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    items: cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [removingId, setRemovingId] = useState(null);

  const subtotal = cartTotal;
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5;
  const total = subtotal + shipping;

  const closeCart = useCallback(() => setIsCartOpen(false), [setIsCartOpen]);

  /* ─── Open Cart Event Listener ─── */
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener("open-cart-drawer", handleOpenCart);
    return () => window.removeEventListener("open-cart-drawer", handleOpenCart);
  }, [setIsCartOpen]);

  /* ─── Focus Trap ─── */
  const trapFocus = useCallback((e) => {
    if (e.key !== 'Tab' || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, []);

  /* ─── Escape & focus management ─── */
  useEffect(() => {
    if (isCartOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
      document.addEventListener('keydown', trapFocus);
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
    const handleEscape = (e) => { if (e.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', trapFocus);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, closeCart, trapFocus]);

  /* ─── Remove with animation ─── */
  const handleRemove = (cartItemId) => {
    setRemovingId(cartItemId);
    setTimeout(() => {
      removeFromCart(cartItemId);
      setRemovingId(null);
    }, 300);
  };

  /* ─── Close on navigation ─── */
  const handleNavigate = () => closeCart();

  if (!isCartOpen) return null;

  return (
    <>
      <style>{cartDrawerStyles}</style>
      <div className="cart-drawer-overlay" onClick={closeCart} aria-hidden="true" />
      <aside
        ref={drawerRef}
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`Shopping cart with ${cartCount} items`}
      >
        {/* ─── Header ─── */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title-row">
            <h2 className="cart-drawer__title">Your Cart</h2>
            {cartCount > 0 && (
              <span className="cart-drawer__count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
            )}
          </div>
          <button
            ref={closeButtonRef}
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ─── Content ─── */}
        {cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <svg className="cart-drawer__empty-icon" width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <path d="M20 20h4l5.2 26h21.6l6-18H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="34" cy="54" r="3" fill="currentColor" />
              <circle cx="50" cy="54" r="3" fill="currentColor" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <p className="cart-drawer__empty-text">Your cart is empty</p>
            <p className="cart-drawer__empty-sub">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/shop" className="cart-drawer__start-btn" onClick={handleNavigate}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* ─── Items List ─── */}
            <ul className="cart-drawer__items" aria-label="Cart items">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className={`cart-drawer__item${removingId === item.id ? ' cart-drawer__item--removing' : ''}`}
                >
                  <div className="cart-drawer__item-img">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                  <div className="cart-drawer__item-details">
                    <p className="cart-drawer__item-name">{item.name}</p>
                    <div className="cart-drawer__item-meta">
                      {item.size && <span className="cart-drawer__item-tag">Size: {item.size}</span>}
                      {item.color && <span className="cart-drawer__item-tag">Color: {item.color}</span>}
                    </div>
                    <p className="cart-drawer__item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-drawer__qty-row">
                      <button
                        className="cart-drawer__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M3 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                      <span className="cart-drawer__qty-val" aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>
                      <button
                        className="cart-drawer__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= 10}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                      <button
                        className="cart-drawer__remove-btn"
                        onClick={() => handleRemove(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M2 4h12M5.33 4V2.67a1.33 1.33 0 011.34-1.34h2.66a1.33 1.33 0 011.34 1.34V4m2 0v9.33a1.33 1.33 0 01-1.34 1.34H4.67a1.33 1.33 0 01-1.34-1.34V4h9.34z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6.67 7.33v4M9.33 7.33v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* ─── Order Summary ─── */}
            <div className="cart-drawer__summary">
              <div className="cart-drawer__summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-drawer__summary-row">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'cart-drawer__free' : ''}>
                  {shipping === 0 ? 'Free' : '$5.00'}
                </span>
              </div>
              {shipping > 0 && (
                <p className="cart-drawer__shipping-hint">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="cart-drawer__summary-divider" />
              <div className="cart-drawer__summary-row cart-drawer__summary-total">
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link href="/checkout" className="cart-drawer__checkout-btn" onClick={handleNavigate}>
                Checkout
              </Link>
              <button className="cart-drawer__continue-btn" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ─── Scoped Styles (injected) ─── */
const cartDrawerStyles = `
  /* Overlay */
  .cart-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 9998;
    animation: fadeIn 0.25s ease-out;
  }

  /* Drawer panel */
  .cart-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: min(440px, 92vw);
    height: 100dvh;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    background: rgba(255, 245, 249, 0.82);
    backdrop-filter: blur(24px) saturate(1.6);
    -webkit-backdrop-filter: blur(24px) saturate(1.6);
    border-left: 1px solid rgba(244, 37, 140, 0.12);
    box-shadow: -12px 0 48px rgba(0, 0, 0, 0.12);
    animation: slideInRight 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @media (prefers-color-scheme: dark) {
    .cart-drawer {
      background: rgba(28, 16, 24, 0.88);
      border-left-color: rgba(244, 37, 140, 0.18);
      box-shadow: -12px 0 48px rgba(0, 0, 0, 0.35);
    }
  }

  /* ─── Animations ─── */
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); }
    to   { transform: translateX(100%); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes fadeOutItem {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(40px); }
  }

  /* ─── Header ─── */
  .cart-drawer__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 24px 16px;
    border-bottom: 1px solid var(--border-light, #e8cedb);
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__header { border-bottom-color: #3a2030; }
  }
  .cart-drawer__title-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .cart-drawer__title {
    font-size: 1.35rem;
    font-weight: 700;
    color: #1c0d14;
    letter-spacing: -0.02em;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__title { color: #f8f0f4; }
  }
  .cart-drawer__count {
    font-size: 0.82rem;
    font-weight: 600;
    color: #f4258c;
    background: rgba(244, 37, 140, 0.1);
    padding: 2px 10px;
    border-radius: 20px;
  }
  .cart-drawer__close {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(232, 206, 219, 0.5);
    background: rgba(255, 255, 255, 0.5);
    color: #1c0d14;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: all 0.2s ease;
  }
  .cart-drawer__close:hover {
    background: rgba(244, 37, 140, 0.1);
    border-color: #f4258c;
    color: #f4258c;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__close {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(184, 122, 152, 0.25);
      color: #f8f0f4;
    }
    .cart-drawer__close:hover {
      background: rgba(244, 37, 140, 0.15);
      color: #f4258c;
    }
  }

  /* ─── Empty State ─── */
  .cart-drawer__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    text-align: center;
    gap: 8px;
  }
  .cart-drawer__empty-icon {
    color: #b87a98;
    margin-bottom: 8px;
  }
  .cart-drawer__empty-text {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1c0d14;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__empty-text { color: #f8f0f4; }
  }
  .cart-drawer__empty-sub {
    font-size: 0.9rem;
    color: #9c4973;
    margin-bottom: 12px;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__empty-sub { color: #b87a98; }
  }
  .cart-drawer__start-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 32px;
    border-radius: 50px;
    background: linear-gradient(135deg, #f4258c, #e63946, #ff8c00);
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(244, 37, 140, 0.3);
  }
  .cart-drawer__start-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 28px rgba(244, 37, 140, 0.4);
  }

  /* ─── Items List ─── */
  .cart-drawer__items {
    flex: 1;
    overflow-y: auto;
    padding: 16px 24px;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .cart-drawer__items::-webkit-scrollbar {
    width: 5px;
  }
  .cart-drawer__items::-webkit-scrollbar-thumb {
    background: rgba(244, 37, 140, 0.2);
    border-radius: 10px;
  }

  /* ─── Single Item ─── */
  .cart-drawer__item {
    display: flex;
    gap: 14px;
    padding: 14px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.55);
    border: 1px solid rgba(232, 206, 219, 0.4);
    transition: all 0.3s ease;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__item {
      background: rgba(38, 21, 32, 0.55);
      border-color: rgba(58, 32, 48, 0.6);
    }
  }
  .cart-drawer__item--removing {
    animation: fadeOutItem 0.3s ease forwards;
  }
  .cart-drawer__item-img {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(244, 37, 140, 0.05);
  }
  .cart-drawer__item-details {
    flex: 1;
    min-width: 0;
  }
  .cart-drawer__item-name {
    font-weight: 700;
    font-size: 0.92rem;
    color: #1c0d14;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__item-name { color: #f8f0f4; }
  }
  .cart-drawer__item-meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }
  .cart-drawer__item-tag {
    font-size: 0.75rem;
    color: #9c4973;
    background: rgba(244, 37, 140, 0.06);
    padding: 1px 8px;
    border-radius: 4px;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__item-tag { color: #b87a98; background: rgba(244, 37, 140, 0.1); }
  }
  .cart-drawer__item-price {
    font-weight: 700;
    font-size: 0.95rem;
    color: #f4258c;
    margin-bottom: 6px;
  }

  /* ─── Quantity Controls ─── */
  .cart-drawer__qty-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .cart-drawer__qty-btn {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 1px solid rgba(232, 206, 219, 0.5);
    background: rgba(255, 255, 255, 0.6);
    color: #1c0d14;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: all 0.2s ease;
  }
  .cart-drawer__qty-btn:hover:not(:disabled) {
    border-color: #f4258c;
    color: #f4258c;
    background: rgba(244, 37, 140, 0.08);
  }
  .cart-drawer__qty-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__qty-btn {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(184, 122, 152, 0.25);
      color: #f8f0f4;
    }
  }
  .cart-drawer__qty-val {
    min-width: 28px;
    text-align: center;
    font-weight: 700;
    font-size: 0.9rem;
    color: #1c0d14;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__qty-val { color: #f8f0f4; }
  }
  .cart-drawer__remove-btn {
    margin-left: auto;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: #9c4973;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: all 0.2s ease;
  }
  .cart-drawer__remove-btn:hover {
    color: #e63946;
    background: rgba(230, 57, 70, 0.08);
  }

  /* ─── Order Summary ─── */
  .cart-drawer__summary {
    padding: 20px 24px 28px;
    border-top: 1px solid rgba(232, 206, 219, 0.4);
    background: rgba(255, 255, 255, 0.35);
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__summary {
      border-top-color: rgba(58, 32, 48, 0.6);
      background: rgba(28, 16, 24, 0.45);
    }
  }
  .cart-drawer__summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #1c0d14;
    margin-bottom: 8px;
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__summary-row { color: #f8f0f4; }
  }
  .cart-drawer__free {
    color: #008026;
    font-weight: 700;
  }
  .cart-drawer__shipping-hint {
    font-size: 0.78rem;
    color: #9c4973;
    margin-bottom: 8px;
  }
  .cart-drawer__summary-divider {
    height: 1px;
    background: linear-gradient(90deg, #E40303, #FF8C00, #FFED00, #008026, #004DFF, #750787);
    border-radius: 1px;
    margin: 10px 0;
    opacity: 0.5;
  }
  .cart-drawer__summary-total {
    font-weight: 800;
    font-size: 1.05rem;
    margin-bottom: 16px;
  }

  /* ─── Checkout Button ─── */
  .cart-drawer__checkout-btn {
    display: block;
    width: 100%;
    padding: 14px;
    text-align: center;
    border-radius: 50px;
    background: linear-gradient(90deg, #E40303, #FF8C00, #FFED00, #008026, #004DFF, #750787);
    background-size: 200% 100%;
    color: #fff;
    font-weight: 800;
    font-size: 1rem;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 20px rgba(244, 37, 140, 0.3);
  }
  .cart-drawer__checkout-btn:hover {
    background-position: 100% 0;
    transform: translateY(-2px);
    box-shadow: 0 6px 28px rgba(244, 37, 140, 0.45);
  }
  .cart-drawer__continue-btn {
    display: block;
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    background: none;
    border: 1px solid rgba(232, 206, 219, 0.5);
    border-radius: 50px;
    color: #9c4973;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }
  .cart-drawer__continue-btn:hover {
    border-color: #f4258c;
    color: #f4258c;
    background: rgba(244, 37, 140, 0.05);
  }
  @media (prefers-color-scheme: dark) {
    .cart-drawer__continue-btn {
      border-color: rgba(184, 122, 152, 0.3);
      color: #b87a98;
    }
    .cart-drawer__continue-btn:hover {
      border-color: #f4258c;
      color: #f4258c;
    }
  }
`;
