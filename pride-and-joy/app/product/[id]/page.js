'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, getProductById, getRelatedProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

/* ── Size Guide Data ── */
const SIZE_CHART = [
  { size: 'S', chest: '36"', length: '27"', sleeve: '8"' },
  { size: 'M', chest: '38-40"', length: '28"', sleeve: '8.5"' },
  { size: 'L', chest: '42-44"', length: '29"', sleeve: '9"' },
  { size: 'XL', chest: '46-48"', length: '30"', sleeve: '9.5"' },
  { size: '2XL', chest: '50-52"', length: '31"', sleeve: '10"' },
];

/* ── Star Rating Component ── */
function StarRating({ rating, reviewCount }) {
  return (
    <div className="pdp-rating" aria-label={`Rating: ${rating} out of 5, ${reviewCount} reviews`}>
      <div className="pdp-stars">
        {[...Array(5)].map((_, i) => {
          const filled = i < Math.floor(rating);
          const halfFilled = !filled && i < rating;
          return (
            <svg
              key={i}
              className={`pdp-star ${filled ? 'pdp-star--filled' : ''} ${halfFilled ? 'pdp-star--half' : ''}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={filled ? '#ff8c00' : halfFilled ? 'url(#halfGrad)' : 'none'}
              stroke="#ff8c00"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {halfFilled && (
                <defs>
                  <linearGradient id="halfGrad">
                    <stop offset="50%" stopColor="#ff8c00" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );
        })}
      </div>
      <span className="pdp-review-count">({reviewCount} reviews)</span>
    </div>
  );
}

/* ── Toast Notification ── */
function Toast({ message, visible }) {
  return (
    <div className={`pdp-toast ${visible ? 'pdp-toast--visible' : ''}`} role="status" aria-live="polite">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

/* ── Product Not Found ── */
function ProductNotFound() {
  return (
    <div className="pdp-not-found">
      <div className="pdp-not-found__icon" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
      <h1 className="pdp-not-found__title">Product Not Found</h1>
      <p className="pdp-not-found__text">
        We couldn&apos;t find the product you&apos;re looking for. It may have been removed or the link might be incorrect.
      </p>
      <Link href="/shop" className="btn-rainbow pdp-not-found__btn">
        Back to Shop
      </Link>
    </div>
  );
}

/* ── Main Product Detail Page ── */
export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [imageHover, setImageHover] = useState(false);

  /* Auto-select first color when product loads */
  const firstColor = product?.colors?.[0]?.name || '';
  if (product && !selectedColor && firstColor) {
    /* Using a conditional set here — runs once synchronously during first render */
  }

  const handleAddToCart = useCallback(() => {
    if (!product || !selectedSize) return;
    const color = selectedColor || product.colors?.[0]?.name || 'Default';
    addToCart(product, selectedSize, color, quantity);
    setToastMessage(`${product.name} added to cart!`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, [product, selectedSize, selectedColor, quantity, addToCart]);

  const decrementQty = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1));
  }, []);

  const incrementQty = useCallback(() => {
    setQuantity((prev) => Math.min(10, prev + 1));
  }, []);

  /* ── 404 state ── */
  if (!product) {
    return <ProductNotFound />;
  }

  const relatedProducts = getRelatedProducts(params.id, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <main className="pdp">
      <Toast message={toastMessage} visible={toastVisible} />

      {/* ── Breadcrumb ── */}
      <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
        <ol className="pdp-breadcrumb__list">
          <li className="pdp-breadcrumb__item">
            <Link href="/" className="pdp-breadcrumb__link">Home</Link>
            <span className="pdp-breadcrumb__sep" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </span>
          </li>
          <li className="pdp-breadcrumb__item">
            <Link href="/shop" className="pdp-breadcrumb__link">Shop</Link>
            <span className="pdp-breadcrumb__sep" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </span>
          </li>
          <li className="pdp-breadcrumb__item pdp-breadcrumb__item--active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* ── Product Layout ── */}
      <div className="pdp-layout">
        {/* Left: Image Gallery */}
        <div className="pdp-gallery">
          <div
            className={`pdp-gallery__main ${imageHover ? 'pdp-gallery__main--zoomed' : ''}`}
            onMouseEnter={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="pdp-gallery__image"
              priority
            />
            {product.badge && (
              <span className={`pdp-gallery__badge pdp-gallery__badge--${product.badge.toLowerCase().replace(' ', '-')}`}>
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="pdp-info">
          <h1 className="pdp-info__name">{product.name}</h1>

          <StarRating rating={product.rating} reviewCount={product.reviewCount} />

          {/* Price */}
          <div className="pdp-info__price-row">
            <span className="pdp-info__price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="pdp-info__original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="pdp-info__sale-badge">SALE -{discount}%</span>
              </>
            )}
          </div>

          <p className="pdp-info__description">{product.description}</p>

          {/* Size Selector */}
          <div className="pdp-selector">
            <label className="pdp-selector__label">
              Size <span className="pdp-selector__required">*</span>
            </label>
            <div className="pdp-sizes" role="radiogroup" aria-label="Select a size">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`pdp-size-btn ${selectedSize === size ? 'pdp-size-btn--active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                  role="radio"
                  aria-checked={selectedSize === size}
                  aria-label={`Size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="pdp-selector__hint">Please select a size</p>
            )}
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="pdp-selector">
              <label className="pdp-selector__label">
                Color{selectedColor ? `: ${selectedColor}` : ''}
              </label>
              <div className="pdp-colors" role="radiogroup" aria-label="Select a color">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`pdp-color-swatch ${(selectedColor || firstColor) === color.name ? 'pdp-color-swatch--active' : ''}`}
                    onClick={() => setSelectedColor(color.name)}
                    role="radio"
                    aria-checked={(selectedColor || firstColor) === color.name}
                    aria-label={`Color: ${color.name}`}
                    style={{ '--swatch-color': color.hex }}
                    title={color.name}
                  >
                    <span className="pdp-color-swatch__inner" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Picker */}
          <div className="pdp-selector">
            <label className="pdp-selector__label">Quantity</label>
            <div className="pdp-quantity">
              <button
                type="button"
                className="pdp-quantity__btn"
                onClick={decrementQty}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
              <span className="pdp-quantity__value" aria-live="polite" aria-label={`Quantity: ${quantity}`}>
                {quantity}
              </span>
              <button
                type="button"
                className="pdp-quantity__btn"
                onClick={incrementQty}
                aria-label="Increase quantity"
                disabled={quantity >= 10}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            className={`btn-rainbow pdp-add-to-cart ${!selectedSize ? 'pdp-add-to-cart--disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={!selectedSize}
            aria-label={selectedSize ? `Add ${product.name} to cart` : 'Select a size first'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {selectedSize ? 'Add to Cart' : 'Select a Size'}
          </button>

          {/* Features */}
          {product.features && (
            <ul className="pdp-features">
              {product.features.map((feature) => (
                <li key={feature} className="pdp-features__item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Security Badges */}
          <div className="pdp-badges">
            <div className="pdp-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Secure Checkout</span>
            </div>
            <div className="pdp-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              <span>Free Returns</span>
            </div>
            <div className="pdp-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>100% Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Details Tabs ── */}
      <section className="pdp-tabs-section">
        <div className="pdp-tabs" role="tablist" aria-label="Product information tabs">
          {[
            { key: 'description', label: 'Description' },
            { key: 'size-guide', label: 'Size Guide' },
            { key: 'shipping', label: 'Shipping & Returns' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={activeTab === tab.key}
              aria-controls={`panel-${tab.key}`}
              className={`pdp-tab ${activeTab === tab.key ? 'pdp-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
          <div
            className="pdp-tab-indicator"
            style={{
              transform: `translateX(${
                activeTab === 'description' ? '0' :
                activeTab === 'size-guide' ? '100%' : '200%'
              })`,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Tab Panels */}
        <div className="pdp-tab-panels">
          <div
            role="tabpanel"
            id="panel-description"
            aria-labelledby="tab-description"
            className={`pdp-tab-panel ${activeTab === 'description' ? 'pdp-tab-panel--active' : ''}`}
            hidden={activeTab !== 'description'}
          >
            <p className="pdp-tab-panel__text">{product.extendedDescription || product.description}</p>
          </div>

          <div
            role="tabpanel"
            id="panel-size-guide"
            aria-labelledby="tab-size-guide"
            className={`pdp-tab-panel ${activeTab === 'size-guide' ? 'pdp-tab-panel--active' : ''}`}
            hidden={activeTab !== 'size-guide'}
          >
            <div className="pdp-size-table-wrapper">
              <table className="pdp-size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest</th>
                    <th>Length</th>
                    <th>Sleeve</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map((row) => (
                    <tr key={row.size} className={selectedSize === row.size ? 'pdp-size-table__row--highlight' : ''}>
                      <td>{row.size}</td>
                      <td>{row.chest}</td>
                      <td>{row.length}</td>
                      <td>{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="pdp-tab-panel__note">
              Measurements are approximate. For the best fit, we recommend comparing these measurements to a garment you already own and love.
            </p>
          </div>

          <div
            role="tabpanel"
            id="panel-shipping"
            aria-labelledby="tab-shipping"
            className={`pdp-tab-panel ${activeTab === 'shipping' ? 'pdp-tab-panel--active' : ''}`}
            hidden={activeTab !== 'shipping'}
          >
            <div className="pdp-shipping-info">
              <h3 className="pdp-shipping-info__title">Shipping</h3>
              <ul className="pdp-shipping-info__list">
                <li><strong>Standard Shipping:</strong> 5–7 business days (Free on orders over $50)</li>
                <li><strong>Express Shipping:</strong> 2–3 business days ($9.99)</li>
                <li><strong>Next Day Delivery:</strong> Order by 2pm EST ($14.99)</li>
              </ul>

              <h3 className="pdp-shipping-info__title">Returns & Exchanges</h3>
              <ul className="pdp-shipping-info__list">
                <li>Free returns within 30 days of purchase</li>
                <li>Items must be unworn, unwashed, and in original packaging</li>
                <li>Exchanges available for different sizes or colors</li>
                <li>Refunds processed within 5–7 business days</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="pdp-related">
          <h2 className="pdp-related__heading">You Might Also Like</h2>
          <div className="pdp-related__grid">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
