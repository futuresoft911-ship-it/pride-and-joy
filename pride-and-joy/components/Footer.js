import Link from "next/link";

const SHOP_LINKS = [
  { href: "/shop?category=pride", label: "Pride Collection" },
  { href: "/shop?category=trans", label: "Trans Pride" },
  { href: "/shop?category=bi", label: "Bi Pride" },
  { href: "/shop?category=nonbinary", label: "Non-Binary" },
  { href: "/shop?category=lesbian", label: "Lesbian Pride" },
  { href: "/shop?category=new", label: "New Arrivals" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
  { href: "/press", label: "Press" },
];

const SUPPORT_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping Info" },
  { href: "/returns", label: "Returns & Exchanges" },
  { href: "/size-guide", label: "Size Guide" },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Rainbow gradient divider */}
      <div className="footer-rainbow" aria-hidden="true" />

      <div className="footer-content">
        {/* ── Column 1: Brand ── */}
        <div className="footer-col footer-col-brand">
          <Link href="/" className="footer-logo" aria-label="Pride & Joy Home">
            <svg
              className="footer-logo-icon"
              width="28"
              height="24"
              viewBox="0 0 32 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 4C2 2.9 2.9 2 4 2H26C28 2 30 4 29 6C28 8 30 10 29 12C28 14 30 16 29 18C28 20 30 22 29 24C28 26 26 26 26 26H4C2.9 26 2 25.1 2 24V4Z"
                fill="#f4258c"
              />
              <path
                d="M6 8H22M6 13H20M6 18H22"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="footer-logo-text">Pride & Joy</span>
          </Link>
          <p className="footer-tagline">
            Wear your pride. Celebrate your identity with premium quality tees
            designed for comfort, self-expression, and joy.
          </p>

          {/* Social icons */}
          <div className="footer-social">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Follow us on Instagram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Follow us on TikTok"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Follow us on Facebook"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <p className="footer-newsletter-label">Join the Joy — get 10% off</p>
            <form
              className="footer-newsletter-form"
              action="#"
              method="post"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-newsletter-input"
                aria-label="Email for newsletter"
                required
              />
              <button
                type="submit"
                className="footer-newsletter-btn"
                aria-label="Subscribe to newsletter"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* ── Column 2: Shop ── */}
        <div className="footer-col">
          <h3 className="footer-heading">Shop</h3>
          <ul className="footer-links">
            {SHOP_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 3: Company ── */}
        <div className="footer-col">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            {COMPANY_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 4: Support ── */}
        <div className="footer-col">
          <h3 className="footer-heading">Support</h3>
          <ul className="footer-links">
            {SUPPORT_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; 2024 Pride & Joy. All rights reserved.
        </p>

        <div className="footer-payments">
          <span className="payment-icon payment-visa" aria-label="Visa">
            VISA
          </span>
          <span
            className="payment-icon payment-mastercard"
            aria-label="Mastercard"
          >
            MC
          </span>
          <span
            className="payment-icon payment-amex"
            aria-label="American Express"
          >
            AMEX
          </span>
          <span className="footer-secure">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure payments
          </span>
        </div>
      </div>
    </footer>
  );
}
