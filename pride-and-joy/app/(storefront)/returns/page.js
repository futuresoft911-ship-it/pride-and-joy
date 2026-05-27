import Link from "next/link";

export const metadata = {
  title: "Refunds & Returns | Pride & Joy",
};

export default function ReturnsPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>Refund & Returns Policy</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Effective Date: April 2025</p>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>1. Overview</h2>
          <p>Pride & Joy is committed to ensuring your satisfaction with every purchase. If you are not completely happy with your apparel, this policy sets out the conditions under which you may return items and request refunds.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>2. Return Conditions</h2>
          <p>To be eligible for a refund or exchange, the item must be:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Returned within 30 calendar days of receiving your order.</li>
            <li>Unworn, unwashed, and in its original, resalable condition.</li>
            <li>In its original packaging with all tags attached.</li>
          </ul>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>3. Damaged or Incorrect Items</h2>
          <p>If you receive an item that is damaged, defective, or incorrect, please contact us within 48 hours of receipt at <a href="mailto:support@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>support@prideandjoy.com</a> with your order number and photos of the issue. We will arrange a free replacement or a full refund.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>4. Refund Processing</h2>
          <p>Upon receiving your returned item, we will process your refund within 7-10 business days. Refunds will be issued to your original payment method.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>5. How to Request a Return</h2>
          <p>To initiate a return, email us at <a href="mailto:returns@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>returns@prideandjoy.com</a> with the subject line: 'Return Request — [Your Order Number]'. We will provide you with a return shipping label and instructions.</p>
        </div>
      </div>
    </main>
  );
}
