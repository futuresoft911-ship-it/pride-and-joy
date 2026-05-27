"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/app/actions/orders";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  
  const subtotal = cartTotal;
  const shipping = subtotal > 50 ? 0 : 5;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States"
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    sameAsShipping: true
  });

  const handleShippingChange = (e) => {
    setShippingData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setPaymentData(prev => ({ ...prev, [name]: checked }));
    } else {
      setPaymentData(prev => ({ ...prev, [name]: value }));
    }
  };

  const submitShipping = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const submitPayment = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const placeOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const res = await createOrder({
        customerInfo: shippingData,
        items,
        total
      });
      
      if (res.success) {
        setOrderNumber(res.orderNumber);
        setIsSuccess(true);
        clearCart();
      } else {
        alert("Failed to place order.");
      }
    } catch (e) {
      alert("Error placing order.");
    }
    setIsPlacingOrder(false);
  };

  if (isSuccess) {
    return (
      <main className="checkout-page checkout-success">
        <div className="container text-center">
          <div className="success-icon-wrapper mx-auto mb-6">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#008026" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="success-icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
          </div>
          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-order-num">Order #{orderNumber}</p>
          <p className="success-msg">Thank you for wearing your pride! We&apos;ve sent a confirmation email to {shippingData.email}.</p>
          <Link href="/shop" className="btn btn-rainbow mt-8">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        {/* ─── BREADCRUMB ─── */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/cart">Cart</Link>
          <span className="breadcrumb-separator">/</span>
          <span aria-current="page">Checkout</span>
        </nav>

        <h1 className="page-title sr-only">Checkout</h1>

        <div className="checkout-layout">
          {/* ─── CHECKOUT FORM (Left) ─── */}
          <div className="checkout-main-column">
            
            {/* Progress Bar */}
            <div className="checkout-progress">
              <div className={`progress-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
                <div className="step-circle">{step > 1 ? "✓" : "1"}</div>
                <div className="step-label">Shipping</div>
              </div>
              <div className="progress-line" />
              <div className={`progress-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
                <div className="step-circle">{step > 2 ? "✓" : "2"}</div>
                <div className="step-label">Payment</div>
              </div>
              <div className="progress-line" />
              <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
                <div className="step-circle">3</div>
                <div className="step-label">Review</div>
              </div>
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <form onSubmit={submitShipping} className="checkout-form-section fade-in">
                <h2 className="checkout-section-title">Shipping Address</h2>
                <div className="form-grid">
                  <div className="form-group col-span-2">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required value={shippingData.fullName} onChange={handleShippingChange} />
                  </div>
                  <div className="form-group col-span-1">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required value={shippingData.email} onChange={handleShippingChange} />
                  </div>
                  <div className="form-group col-span-1">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required value={shippingData.phone} onChange={handleShippingChange} />
                  </div>
                  <div className="form-group col-span-2">
                    <label htmlFor="address1">Address Line 1</label>
                    <input type="text" id="address1" name="address1" required value={shippingData.address1} onChange={handleShippingChange} />
                  </div>
                  <div className="form-group col-span-2">
                    <label htmlFor="address2">Address Line 2 (Optional)</label>
                    <input type="text" id="address2" name="address2" value={shippingData.address2} onChange={handleShippingChange} />
                  </div>
                  <div className="form-group col-span-1">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" required value={shippingData.city} onChange={handleShippingChange} />
                  </div>
                  <div className="form-group col-span-1">
                    <label htmlFor="state">State</label>
                    <select id="state" name="state" required value={shippingData.state} onChange={handleShippingChange}>
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      {/* Would add full state list here */}
                    </select>
                  </div>
                  <div className="form-group col-span-1">
                    <label htmlFor="zip">ZIP Code</label>
                    <input type="text" id="zip" name="zip" required value={shippingData.zip} onChange={handleShippingChange} />
                  </div>
                  <div className="form-group col-span-1">
                    <label htmlFor="country">Country</label>
                    <select id="country" name="country" disabled value={shippingData.country} onChange={handleShippingChange}>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>
                <div className="checkout-actions">
                  <button type="submit" className="btn btn-rainbow">Continue to Payment</button>
                </div>
              </form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <form onSubmit={submitPayment} className="checkout-form-section fade-in">
                <h2 className="checkout-section-title">Payment Details</h2>
                <div className="form-grid">
                  <div className="form-group col-span-2">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" maxLength="19" required value={paymentData.cardNumber} onChange={handlePaymentChange} />
                  </div>
                  <div className="form-group col-span-2">
                    <label htmlFor="cardName">Name on Card</label>
                    <input type="text" id="cardName" name="cardName" required value={paymentData.cardName} onChange={handlePaymentChange} />
                  </div>
                  <div className="form-group col-span-1">
                    <label htmlFor="expiry">Expiry (MM/YY)</label>
                    <input type="text" id="expiry" name="expiry" placeholder="MM/YY" maxLength="5" required value={paymentData.expiry} onChange={handlePaymentChange} />
                  </div>
                  <div className="form-group col-span-1">
                    <label htmlFor="cvv">CVV</label>
                    <input type="password" id="cvv" name="cvv" placeholder="123" maxLength="4" required value={paymentData.cvv} onChange={handlePaymentChange} />
                  </div>
                  <div className="form-group col-span-2 checkbox-group">
                    <input type="checkbox" id="sameAsShipping" name="sameAsShipping" checked={paymentData.sameAsShipping} onChange={handlePaymentChange} />
                    <label htmlFor="sameAsShipping">Billing address is same as shipping</label>
                  </div>
                </div>
                <div className="checkout-actions flex-between">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>Back to Shipping</button>
                  <button type="submit" className="btn btn-rainbow">Review Order</button>
                </div>
              </form>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="checkout-form-section fade-in">
                <h2 className="checkout-section-title">Review Your Order</h2>
                
                <div className="review-block">
                  <div className="review-header">
                    <h3>Shipping Address</h3>
                    <button type="button" className="btn-edit" onClick={() => setStep(1)}>Edit</button>
                  </div>
                  <div className="review-content">
                    <p>{shippingData.fullName}</p>
                    <p>{shippingData.address1} {shippingData.address2}</p>
                    <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
                    <p>{shippingData.country}</p>
                  </div>
                </div>

                <div className="review-block">
                  <div className="review-header">
                    <h3>Payment Method</h3>
                    <button type="button" className="btn-edit" onClick={() => setStep(2)}>Edit</button>
                  </div>
                  <div className="review-content">
                    <p>Card ending in {paymentData.cardNumber.slice(-4) || "****"}</p>
                    <p>Billing: {paymentData.sameAsShipping ? "Same as shipping" : "Different address"}</p>
                  </div>
                </div>

                <div className="checkout-actions flex-between">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>Back to Payment</button>
                  <button type="button" className={`btn btn-rainbow ${isPlacingOrder ? "loading" : ""}`} onClick={placeOrder} disabled={isPlacingOrder}>
                    {isPlacingOrder ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─── ORDER SUMMARY SIDEBAR (Right) ─── */}
          <div className="checkout-summary-column">
            <div className="order-summary sticky-summary">
              <h2 className="order-summary-title">Order Summary</h2>
              
              <div className="summary-items-scroll">
                {items.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="summary-item-img">
                      <Image src={item.image} alt={item.name} width={50} height={50} />
                      <span className="summary-item-qty-badge">{item.quantity}</span>
                    </div>
                    <div className="summary-item-info">
                      <span className="summary-item-name">{item.name}</span>
                      <span className="summary-item-meta">Size: {item.size}</span>
                    </div>
                    <div className="summary-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-divider mt-4" />
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
              
              <div className="security-badge mt-6 justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Secure SSL Encrypted Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
