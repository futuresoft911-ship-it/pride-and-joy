"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  }, [options]);

  return [ref, isInView];
}

export default function AboutPage() {
  const [storyRef, storyVisible] = useInView();
  const [valuesRef, valuesVisible] = useInView();

  return (
    <main className="about-page">
      {/* ─── HERO ─── */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <Image
            src="/images/hero-banner.png"
            alt="Diverse group celebrating pride"
            fill
            className="about-hero__image"
            priority
          />
          <div className="about-hero__overlay" aria-hidden="true" />
        </div>
        <div className="container about-hero__content">
          <h1 className="about-hero__title">More Than a T-Shirt.<br/>It&apos;s a Statement.</h1>
          <p className="about-hero__subtitle">
            We exist to celebrate every identity through premium, expressive fashion.
          </p>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section
        ref={storyRef}
        className={`section about-story ${storyVisible ? "section--visible" : ""}`}
      >
        <div className="container about-story__inner">
          <div className="about-story__text">
            <h2 className="section__title">Our Story</h2>
            <div className="section__title-underline" aria-hidden="true" />
            <div className="about-story__content">
              <p>
                Pride &amp; Joy was born out of a simple idea: that wearing your pride
                shouldn&apos;t mean compromising on quality or style. Frustrated by the
                lack of premium, comfortable, and ethically made pride apparel, we
                decided to create our own.
              </p>
              <p>
                What started as a small passion project in a tiny apartment has
                blossomed into a vibrant community. We believe that a t-shirt is more
                than just fabric—it&apos;s a canvas for self-expression, a conversation
                starter, and a statement of who you are.
              </p>
              <p>
                Every design we create is infused with love, authenticity, and a deep
                respect for the rich history and beautiful diversity of the LGBTQ+
                community. We&apos;re not just selling clothes; we&apos;re helping you wear
                your heart on your sleeve.
              </p>
            </div>
          </div>
          <div className="about-story__image-wrapper">
            <Image
              src="/images/screen-printing.png"
              alt="Screen printing press applying a rainbow design"
              width={500}
              height={500}
              className="about-story__image"
            />
          </div>
        </div>
      </section>

      {/* ─── MISSION & VALUES ─── */}
      <section
        ref={valuesRef}
        className={`section about-values ${valuesVisible ? "section--visible" : ""}`}
      >
        <div className="container">
          <h2 className="section__title text-center">What We Stand For</h2>
          <div className="section__title-underline mx-auto" aria-hidden="true" />
          
          <div className="features__grid">
            <div className="feature-card" style={{ animationDelay: "0ms" }}>
              <div className="feature-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="feature-card__title">Inclusivity</h3>
              <p className="feature-card__desc">Every body, every identity, every love. We design for the entire spectrum.</p>
            </div>
            
            <div className="feature-card" style={{ animationDelay: "150ms" }}>
              <div className="feature-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="feature-card__title">Authenticity</h3>
              <p className="feature-card__desc">Queer-owned and operated. Our designs are authentic expressions of our community.</p>
            </div>
            
            <div className="feature-card" style={{ animationDelay: "300ms" }}>
              <div className="feature-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-card__title">Community</h3>
              <p className="feature-card__desc">We give back. 10% of all profits are donated directly to LGBTQ+ charities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPACT NUMBERS ─── */}
      <section className="about-impact">
        <div className="container about-impact__inner">
          <div className="stats__item">
            <span className="stats__number">$50,000+</span>
            <span className="stats__label">Donated</span>
          </div>
          <div className="stats__divider" aria-hidden="true" />
          <div className="stats__item">
            <span className="stats__number">15+</span>
            <span className="stats__label">Charity Partners</span>
          </div>
          <div className="stats__divider" aria-hidden="true" />
          <div className="stats__item">
            <span className="stats__number">10,000+</span>
            <span className="stats__label">Proud Customers</span>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="about-cta section text-center">
        <div className="container">
          <h2 className="about-cta__title">Ready to Wear Your Pride?</h2>
          <Link href="/shop" className="btn btn-rainbow">
            Shop Our Collection
          </Link>
        </div>
      </section>
    </main>
  );
}
