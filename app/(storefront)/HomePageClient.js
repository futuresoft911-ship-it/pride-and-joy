'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
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
      { threshold: 0.15, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [counterRef, isVisible] = useInView();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const numericEnd = parseInt(end.replace(/[^0-9]/g, ''));

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericEnd));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={counterRef}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Home Page ─── */
export default function HomePageClient() {
  const [heroRef, heroVisible] = useInView();
  const [featuredRef, featuredVisible] = useInView();
  const [featuresRef, featuresVisible] = useInView();
  const [statsRef, statsVisible] = useInView();
  const [newsletterRef, newsletterVisible] = useInView();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const bestSellers = products.filter(
    (p) => p.category === 'Best Sellers' || p.badge === 'Best Seller'
  ).slice(0, 4);

  /* If fewer than 4 best sellers, pad with other products */
  const featured = bestSellers.length >= 4
    ? bestSellers
    : [...bestSellers, ...products.filter((p) => !bestSellers.includes(p))].slice(0, 4);

  const handleSubscribe = useCallback((e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  }, [email]);

  return (
    <main className="home">
      {/* ═══════ HERO ═══════ */}
      <section
        ref={heroRef}
        className={`hero ${heroVisible ? 'hero--visible' : ''}`}
        aria-label="Welcome to Pride & Joy"
      >
        <div className="hero__bg">
          <div className="hero__gradient-mesh" aria-hidden="true" />
          <div className="hero__particles" aria-hidden="true">
            <span className="hero__particle hero__particle--1" />
            <span className="hero__particle hero__particle--2" />
            <span className="hero__particle hero__particle--3" />
            <span className="hero__particle hero__particle--4" />
            <span className="hero__particle hero__particle--5" />
            <span className="hero__particle hero__particle--6" />
          </div>
        </div>

        <div className="hero__content container">
          <div className="hero__text">
            <h1 className="hero__heading">
              <span className="hero__heading-line">Wear Your</span>
              <span className="hero__heading-pride">Pride.</span>
            </h1>
            <p className="hero__subheading">
              Celebrate your identity through fashion. Premium quality tees
              designed with love for the LGBTQ+ community.
            </p>
            <div className="hero__ctas">
              <Link href="/shop" className="btn btn-rainbow">
                Shop the Collection
              </Link>
              <Link href="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>
          </div>

          <div className="hero__image-wrapper">
            <Image
              src="/images/hero-banner.png"
              alt="Diverse group of people celebrating pride wearing colorful t-shirts"
              width={600}
              height={600}
              className="hero__image"
              priority
            />
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED PRODUCTS ═══════ */}
      <section
        ref={featuredRef}
        className={`featured section ${featuredVisible ? 'section--visible' : ''}`}
        aria-labelledby="featured-heading"
      >
        <div className="container">
          <div className="section__header">
            <h2 id="featured-heading" className="section__title">
              Bestselling Designs
            </h2>
            <div className="section__title-underline" aria-hidden="true" />
          </div>

          <div className="product-grid product-grid--4">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} priority={true} />
            ))}
          </div>

          <div className="featured__cta">
            <Link href="/shop" className="btn btn-outline">
              View All Products
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES BAR ═══════ */}
      <section
        ref={featuresRef}
        className={`features section ${featuresVisible ? 'section--visible' : ''}`}
        aria-labelledby="features-heading"
      >
        <div className="container">
          <h2 id="features-heading" className="section__title">
            Why Pride &amp; Joy?
          </h2>
          <div className="section__title-underline" aria-hidden="true" />

          <div className="features__grid">
            {/* Premium Quality */}
            <div className="feature-card" style={{ animationDelay: '0ms' }}>
              <div className="feature-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <h3 className="feature-card__title">Premium Quality</h3>
              <p className="feature-card__desc">
                100% organic cotton, ethically sourced
              </p>
            </div>

            {/* Inclusive Sizing */}
            <div className="feature-card" style={{ animationDelay: '150ms' }}>
              <div className="feature-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-card__title">Inclusive Sizing</h3>
              <p className="feature-card__desc">
                XS to 5XL, designed for every body
              </p>
            </div>

            {/* Free Shipping */}
            <div className="feature-card" style={{ animationDelay: '300ms' }}>
              <div className="feature-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="feature-card__title">Free Shipping</h3>
              <p className="feature-card__desc">
                Free worldwide shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SOCIAL PROOF / STATS ═══════ */}
      <section
        ref={statsRef}
        className={`stats ${statsVisible ? 'stats--visible' : ''}`}
        aria-label="Company statistics"
      >
        <div className="stats__inner container">
          <div className="stats__item">
            <span className="stats__number">
              <AnimatedCounter end="10000" suffix="+" />
            </span>
            <span className="stats__label">Happy Customers</span>
          </div>
          <div className="stats__divider" aria-hidden="true" />
          <div className="stats__item">
            <span className="stats__number">
              4.9<span className="stats__star">★</span>
            </span>
            <span className="stats__label">Average Rating</span>
          </div>
          <div className="stats__divider" aria-hidden="true" />
          <div className="stats__item">
            <span className="stats__number">
              <AnimatedCounter end="50" suffix="+" />
            </span>
            <span className="stats__label">Unique Designs</span>
          </div>
        </div>
      </section>

      {/* ═══════ NEWSLETTER ═══════ */}
      <section
        ref={newsletterRef}
        className={`newsletter section ${newsletterVisible ? 'section--visible' : ''}`}
        aria-labelledby="newsletter-heading"
      >
        <div className="container">
          <div className="newsletter__card">
            <h2 id="newsletter-heading" className="newsletter__title">
              Join the Pride &amp; Joy Community
            </h2>
            <p className="newsletter__subtitle">
              Get exclusive access to new drops, special offers, and{' '}
              <strong>10% off</strong> your first order.
            </p>

            {subscribed ? (
              <div className="newsletter__success" role="status">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008026" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Welcome to the community! Check your inbox for your 10% discount code.</span>
              </div>
            ) : (
              <form
                className="newsletter__form"
                onSubmit={handleSubscribe}
                noValidate
              >
                <div className="newsletter__input-group">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    className="newsletter__input"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-required="true"
                  />
                  <button
                    type="submit"
                    className="btn btn-rainbow newsletter__btn"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}

            <p className="newsletter__privacy">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
