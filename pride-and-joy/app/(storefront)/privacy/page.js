import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Pride & Joy",
};

export default function PrivacyPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>Privacy Policy</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Effective Date: April 2025</p>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>1. Introduction</h2>
          <p>Welcome to Pride & Joy. We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information when you visit our website or purchase our apparel.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>2. Personal Data We Collect</h2>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li><strong>Identity & Contact Data:</strong> Full name, email address, telephone number, billing and shipping address.</li>
            <li><strong>Financial Data:</strong> We use authorized payment processors (Stripe). We do not store full payment card numbers on our systems.</li>
            <li><strong>Technical Data:</strong> Browser type, device type, operating system, pages visited, and IP addresses.</li>
          </ul>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>3. How We Share Your Data</h2>
          <p>We do not sell, rent, or trade your personal data. We only share data with trusted third-party service providers (like payment processors and shipping carriers) under appropriate contractual safeguards.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>4. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, loss, or alteration, including TLS/SSL encryption for all data transmissions.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>5. Contact Us</h2>
          <p>For any privacy-related questions, please contact our Data Controller at <a href="mailto:privacy@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>privacy@prideandjoy.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
