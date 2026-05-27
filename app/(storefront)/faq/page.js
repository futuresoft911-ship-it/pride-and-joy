import Link from "next/link";

export const metadata = {
  title: "FAQ | Pride & Joy",
};

export default function FAQPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "3rem", color: "var(--text)" }}>Frequently Asked Questions</h1>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "0.5rem" }}>Where are your t-shirts made?</h3>
            <p>Our apparel is ethically sourced and printed in the USA. We partner with manufacturers who guarantee fair labor practices and utilize sustainable materials whenever possible.</p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "0.5rem" }}>Are your shirts unisex?</h3>
            <p>Yes! All our t-shirts are designed with a unisex, gender-neutral fit. We believe clothing has no gender. Please refer to our <Link href="/size-guide" style={{ color: "var(--primary)", textDecoration: "underline" }}>Size Guide</Link> for detailed measurements.</p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "0.5rem" }}>How do I track my order?</h3>
            <p>Once your order ships, you will receive a confirmation email with a tracking link. You can also track your order status by logging into your Pride & Joy account.</p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "0.5rem" }}>Do you ship internationally?</h3>
            <p>Yes, we ship to most countries worldwide! International shipping rates and delivery times vary by destination and are calculated at checkout.</p>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "0.5rem" }}>How can I become a vendor?</h3>
            <p>We are always looking for talented LGBTQ+ artists and designers. If you're interested in selling your designs on Pride & Joy, please visit our Vendor Portal to apply.</p>
          </div>

        </div>
      </div>
    </main>
  );
}
