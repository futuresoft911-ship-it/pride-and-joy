import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./missing-styles.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  weights: [400, 500, 600, 700, 800],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata = {
  title: "Pride & Joy | Wear Your Pride - LGBTQ+ T-Shirts",
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
    type: "website",
    locale: "en_US",
    siteName: "Pride & Joy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pride & Joy | Wear Your Pride - LGBTQ+ T-Shirts",
    description:
      "Celebrate your identity with Pride & Joy — premium quality LGBTQ+ pride t-shirts.",
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
  return (
    <html
      lang="en"
      className={plusJakartaSans.className}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="app">
        <CartProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
