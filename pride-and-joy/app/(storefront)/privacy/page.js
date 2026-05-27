import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Pride & Joy",
};

export default function PrivacyPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>Privacy Policy</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Effective Date: May 27, 2026 | Last Updated: May 27, 2026</p>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>1. Introduction</h2>
          <p>Welcome to Pride & Joy. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you. This policy is fully compliant with global privacy standards including the GDPR, CCPA, and CPRA.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>2. The Data We Collect About You</h2>
          <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Financial Data:</strong> includes payment card details. <em>Note: All payment data is handled securely by our Payment Card Industry (PCI) compliant payment gateway (Stripe). We do not store full credit card numbers on our servers.</em></li>
            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, and operating system.</li>
          </ul>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>3. How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling your order, processing your payment via Stripe, and arranging shipping).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>4. Disclosures of Your Personal Data</h2>
          <p>We may share your personal data with the parties set out below for the purposes set out in section 3:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li><strong>Payment Processors:</strong> We use Stripe to process all payments securely. Stripe handles your financial data in accordance with their own strict privacy policies and PCI-DSS compliance requirements.</li>
            <li><strong>Shipping Providers:</strong> To deliver your apparel securely.</li>
            <li><strong>IT and System Administration Services:</strong> Providers acting as processors who provide cloud hosting and system administration services.</li>
          </ul>
          <p>We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>5. Data Security & Retention</h2>
          <p>We have put in place appropriate security measures (including SSL encryption) to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered, or disclosed. We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>6. Your Legal Rights (GDPR & CCPA)</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data (the "right to be forgotten").</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
          <p>If you wish to exercise any of the rights set out above, please contact us.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>7. Children's Privacy (COPPA)</h2>
          <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, please do not provide any information on this website.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>8. Contact Details</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact our Data Privacy Manager at <a href="mailto:privacy@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>privacy@prideandjoy.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
