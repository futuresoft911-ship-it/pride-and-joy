'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

/* ─── Custom useInView hook ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [animating, setAnimating] = useState(false);
  const [gridRef, gridVisible] = useInView();

  /* Filter & Sort */
  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'All'
      ? [...products]
      : products.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => {
          const order = { 'New': 0, 'Best Seller': 1, 'Sale': 2 };
          return (order[a.badge] ?? 3) - (order[b.badge] ?? 3);
        });
        break;
      default:
        /* featured — keep original order */
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveCategory(category);
      setAnimating(false);
    }, 300);
  };

  return (
    <main className="shop-page">
      {/* ═══════ PAGE HEADER ═══════ */}
      <div className="shop-page__header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb__list">
              <li className="breadcrumb__item">
                <Link href="/" className="breadcrumb__link">Home</Link>
              </li>
              <li className="breadcrumb__separator" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </li>
              <li className="breadcrumb__item breadcrumb__item--active" aria-current="page">
                Shop
              </li>
            </ol>
          </nav>
          <h1 className="shop-page__title">
            Shop All
            <span className="shop-page__count">
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'})
            </span>
          </h1>
        </div>
      </div>

      {/* ═══════ FILTER & SORT BAR ═══════ */}
      <div className="shop-page__toolbar">
        <div className="container">
          <div className="shop-page__toolbar-inner">
            <div className="filter-pills" role="tablist" aria-label="Product category filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`filter-pill ${activeCategory === cat ? 'filter-pill--active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="sort-control">
              <label htmlFor="sort-select" className="sort-control__label">
                Sort by:
              </label>
              <select
                id="sort-select"
                className="sort-control__select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="shop-page__results-count" role="status" aria-live="polite">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
            {activeCategory !== 'All' && ` in "${activeCategory}"`}
          </p>
        </div>
      </div>

      {/* ═══════ PRODUCT GRID ═══════ */}
      <section className="shop-page__grid-section" aria-label="Products">
        <div className="container">
          {filteredProducts.length > 0 ? (
            <div
              ref={gridRef}
              className={`product-grid product-grid--shop ${gridVisible ? 'product-grid--visible' : ''} ${animating ? 'product-grid--animating-out' : ''}`}
            >
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon" aria-hidden="true">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
              <h2 className="empty-state__title">No products found</h2>
              <p className="empty-state__text">
                We couldn&apos;t find any products matching your current filters.
                Try a different category or reset your filters.
              </p>
              <button
                className="btn btn-rainbow"
                onClick={() => {
                  setActiveCategory('All');
                  setSortBy('featured');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
