import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./missing-styles.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  weights: [400, 500, 600, 700, 800],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pride-and-joy-shop.com'),
  title: {
    default: "Pride & Joy | Wear Your Pride - LGBTQ+ T-Shirts",
    template: "%s | Pride & Joy"
  },
  description:
    "Celebrate your identity with Pride & Joy — premium quality LGBTQ+ pride t-shirts designed for comfort, self-expression, and joy. Wear your pride every day.",
  keywords: [
    "LGBTQ+",
    "pride t-shirts",
    "queer fashion",
    "pride clothing",
    "gay pride",
    "trans pride",
    "inclusive fashion",
  ],
  openGraph: {
    title: "Pride & Joy | Wear Your Pride - LGBTQ+ T-Shirts",
    description:
      "Celebrate your identity with Pride & Joy — premium quality LGBTQ+ pride t-shirts designed for comfort, self-expression, and joy.",
    url: '/',
    siteName: "Pride & Joy",
    images: [
      {
        url: '/images/hero-banner.png',
        width: 1200,
        height: 630,
      }
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pride & Joy | Wear Your Pride",
    description: "Celebrate your identity with Pride & Joy — premium quality LGBTQ+ pride t-shirts.",
    images: ['/images/hero-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* Inline script to read localStorage theme before first paint — prevents flash */
const themeInitScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || theme === 'light') {
        document.documentElement.setAttribute('data-theme', theme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://pride-and-joy-shop.com/#organization",
        "name": "Pride & Joy",
        "url": "https://pride-and-joy-shop.com",
        "logo": "https://pride-and-joy-shop.com/images/hero-banner.png",
        "sameAs": [
          "https://instagram.com/prideandjoy",
          "https://tiktok.com/@prideandjoy",
          "https://facebook.com/prideandjoy"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://pride-and-joy-shop.com/#website",
        "url": "https://pride-and-joy-shop.com",
        "name": "Pride & Joy",
        "publisher": {
          "@id": "https://pride-and-joy-shop.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://pride-and-joy-shop.com/shop?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={plusJakartaSans.className}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
