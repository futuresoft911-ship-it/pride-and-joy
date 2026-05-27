import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Pride & Joy",
};

export default function TermsPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>Terms & Conditions</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Effective Date: April 2025</p>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>1. Introduction</h2>
          <p>Please read these Terms and Conditions carefully before using our website or purchasing our products. By accessing our Website, creating an account, or placing an order, you confirm that you have read, understood, and agree to these Terms and Conditions.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>2. Orders and Pricing</h2>
          <p>All prices are displayed on the Website and are inclusive of any applicable taxes unless stated otherwise. We reserve the right to change prices at any time, but changes will not affect orders already confirmed.</p>
          
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>3. Intellectual Property</h2>
          <p>All content on this Website — including text, graphics, logos, images, and apparel designs — is the exclusive property of Pride & Joy and is protected by copyright, trademark, and other applicable intellectual property laws.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>4. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Website or Products.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>5. Contact Us</h2>
          <p>For any questions regarding these Terms and Conditions, please contact us at <a href="mailto:support@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>support@prideandjoy.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
