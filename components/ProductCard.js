'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product, index = 0, style }) {
  const { addToCart } = useCart();
  const {
    name,
    slug,
    price,
    originalPrice,
    image,
    badge,
    rating,
    reviewCount,
  } = product;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <article
      className="product-card"
      style={{
        animationDelay: `${index * 100}ms`,
        ...style,
      }}
      aria-label={`${name} - $${price.toFixed(2)}`}
    >
      <Link href={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="product-card__image"
            loading="lazy"
          />
          {badge && (
            <span
              className={`product-card__badge product-card__badge--${badge.toLowerCase().replace(' ', '-')}`}
            >
              {badge}
            </span>
          )}
          <div className="product-card__overlay">
            <span className="product-card__quick-view">Quick View</span>
          </div>
        </div>

        <div className="product-card__info">
          <h3 className="product-card__name">{name}</h3>

          <div className="product-card__rating" aria-label={`Rating: ${rating} out of 5, ${reviewCount} reviews`}>
            <div className="product-card__stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`product-card__star ${i < Math.floor(rating) ? 'product-card__star--filled' : ''}`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(rating) ? '#ff8c00' : 'none'}
                  stroke={i < Math.floor(rating) ? '#ff8c00' : 'currentColor'}
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="product-card__review-count">({reviewCount})</span>
          </div>

          <div className="product-card__price-row">
            <span className="product-card__price">${price.toFixed(2)}</span>
            {originalPrice && (
              <>
                <span className="product-card__original-price">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="product-card__discount">-{discount}%</span>
              </>
            )}
          </div>
        </div>
      </Link>

      <button
        className="product-card__add-to-cart"
        aria-label={`Add ${name} to cart`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(product, product.sizes?.[0] || 'M', null, 1);
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        Add to Cart
      </button>
    </article>
  );
}
