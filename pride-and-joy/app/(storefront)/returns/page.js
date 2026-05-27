import Link from "next/link";

export const metadata = {
  title: "Refunds & Returns | Pride & Joy",
};

export default function ReturnsPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>Refund & Returns Policy</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Effective Date: May 27, 2026 | Last Updated: May 27, 2026</p>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>1. 30-Day Return Guarantee</h2>
          <p>At Pride & Joy, we want you to be absolutely thrilled with your apparel. We offer a comprehensive 30-day return policy. If 30 days have gone by since your purchase was delivered, unfortunately, we can’t offer you a refund or exchange.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>2. Eligibility for Returns & Exchanges</h2>
          <p>To be eligible for a return or exchange, your item must meet the following strict criteria:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>The item must be unused, unworn, unwashed, and in the exact same condition that you received it.</li>
            <li>It must be in the original packaging with all original tags attached.</li>
            <li>A receipt or proof of purchase must be provided.</li>
          </ul>
          <p><strong>Non-returnable items:</strong> Gift cards, clearance items marked as "Final Sale", and intimate items (such as underwear or swimwear) due to hygiene reasons.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>3. Process for Initiating a Return</h2>
          <p>To initiate a return, please follow these steps:</p>
          <ol style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Email our support team at <a href="mailto:returns@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>returns@prideandjoy.com</a> with the subject line: "Return Request - Order #[Your Order Number]".</li>
            <li>Detail the reason for the return and attach photos if the item is defective or incorrect.</li>
            <li>Once approved, we will email you a Return Merchandise Authorization (RMA) number and detailed shipping instructions.</li>
            <li>Package the item securely and mail it to the address provided.</li>
          </ol>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>4. Shipping Costs for Returns</h2>
          <p><strong>Customer Responsibility:</strong> You will be responsible for paying for your own shipping costs for returning your item if it is a standard return (e.g., wrong size ordered, changed mind). Shipping costs are non-refundable.</p>
          <p><strong>Defective or Incorrect Items:</strong> If you received an item that is defective, damaged, or incorrect due to an error on our part, Pride & Joy will cover 100% of the return shipping costs. We will provide a pre-paid shipping label for these scenarios.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>5. Refund Processing Timeline</h2>
          <p>Once your return is received and inspected at our facility, we will send you an email to notify you of the approval or rejection of your refund. Inspections typically take 1-3 business days after arrival.</p>
          <p>If you are approved, your refund will be processed immediately. The credit will automatically be applied to your credit card or original method of payment. <strong>Please allow 5-10 business days for the funds to post to your account</strong>, depending on your bank or credit card issuer (processed securely via Stripe).</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>6. Late or Missing Refunds</h2>
          <p>If you haven’t received a refund yet after the 10 business day window:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>First check your bank account again.</li>
            <li>Then contact your credit card company, it may take some time before your refund is officially posted.</li>
            <li>Next contact your bank. There is often some processing time before a refund is posted.</li>
            <li>If you’ve done all of this and you still have not received your refund, please contact us at <a href="mailto:support@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>support@prideandjoy.com</a>.</li>
          </ul>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>7. Exchanges</h2>
          <p>We only replace items if they are defective, damaged, or if you need a different size. If you need to exchange it for the same item, send us an email at <a href="mailto:returns@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>returns@prideandjoy.com</a> to begin the process.</p>
        </div>
      </div>
    </main>
  );
}
