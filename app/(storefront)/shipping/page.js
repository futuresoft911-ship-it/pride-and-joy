import Link from "next/link";

export const metadata = {
  title: "Shipping Info | Pride & Joy",
};

export default function ShippingPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "3rem", color: "var(--text)" }}>Shipping Information</h1>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>Processing Times</h2>
          <p>Since our items are made-to-order to reduce waste, please allow <strong>3-5 business days</strong> for your order to be processed and printed before it ships.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>Domestic Shipping (USA)</h2>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li><strong>Standard Shipping:</strong> 5-7 business days ($5.99)</li>
            <li><strong>Expedited Shipping:</strong> 2-3 business days ($12.99)</li>
          </ul>
          <p><em>Enjoy free standard shipping on all orders over $75!</em></p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>International Shipping</h2>
          <p>We ship globally! International transit times typically range from <strong>7-21 business days</strong> depending on the destination. Customs fees and import duties may apply and are the responsibility of the customer.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>Tracking</h2>
          <p>Once your order leaves our facility, you will receive an email with your tracking number. Tracking updates may take 24-48 hours to reflect in the carrier's system.</p>

        </div>
      </div>
    </main>
  );
}
