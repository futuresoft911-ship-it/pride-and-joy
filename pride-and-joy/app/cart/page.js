"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const subtotal = cartTotal;
  const shipping = subtotal > 50 ? 0 : 5;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="cart-page">
      <div className="container">
        {/* ─── BREADCRUMB ─── */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span aria-current="page">Cart</span>
        </nav>

        <h1 className="page-title">Shopping Cart ({cartCount})</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="cart-empty-icon" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p className="cart-empty-text">Your cart is empty.</p>
            <Link href="/shop" className="btn btn-rainbow">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* ─── CART ITEMS ─── */}
            <div className="cart-items-column">
              <div className="cart-items-header">
                <button type="button" className="btn-clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
              <ul className="cart-list">
                {items.map((item) => (
                  <li key={item.id} className="cart-item-row">
                    <div className="cart-item-image">
                      <Image src={item.image} alt={item.name} width={80} height={80} />
                    </div>
                    <div className="cart-item-details">
                      <Link href={`/product/${item.productId}`} className="cart-item-name">
                        {item.name}
                      </Link>
                      <div className="cart-item-variant">
                        <span>Size: {item.size}</span>
                      </div>
                      <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="cart-item-quantity">
                      <button 
                        type="button" 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        type="button" 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      type="button" 
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ─── ORDER SUMMARY ─── */}
            <div className="cart-summary-column">
              <div className="order-summary sticky-summary">
                <h2 className="order-summary-title">Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="promo-code">
                  <input type="text" placeholder="Promo code" className="promo-input" />
                  <button type="button" className="btn btn-outline promo-btn">Apply</button>
                </div>
                <Link href="/checkout" className="btn btn-rainbow btn-full">
                  Proceed to Checkout
                </Link>
                <div className="security-badge mt-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Secure Checkout &amp; Free Returns</span>
                </div>
                <Link href="/shop" className="continue-shopping-link">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
