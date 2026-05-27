import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

export default function StorefrontLayout({ children }) {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CartDrawer />
        <Toast />
      </div>
    </CartProvider>
  );
}
