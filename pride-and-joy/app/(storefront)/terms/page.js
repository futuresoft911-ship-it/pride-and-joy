import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Pride & Joy",
};

export default function TermsPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>Terms & Conditions</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Effective Date: May 27, 2026 | Last Updated: May 27, 2026</p>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>1. Introduction & Acceptance of Terms</h2>
          <p>Welcome to Pride & Joy. These Terms and Conditions outline the rules and regulations for the use of the Pride & Joy website, located at prideandjoy.com (the "Site"), and the purchase of our products. By accessing this website and/or purchasing from us, we assume you accept these terms and conditions in full. Do not continue to use Pride & Joy if you do not agree to take all of the terms and conditions stated on this page.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>2. Company Information</h2>
          <p>Pride & Joy ("we", "our", "us") operates the website. Our registered business contact address is 123 Pride Ave, San Francisco, CA 94114, USA. You can reach us via email at <a href="mailto:legal@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>legal@prideandjoy.com</a>.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>3. Products, Pricing & Availability</h2>
          <p>We strive to display our products, including colors and sizes, as accurately as possible. However, we cannot guarantee that your monitor's display of any color will be accurate. All products are subject to availability, and we reserve the right to impose quantity limits on any order, to reject all or part of an order, and to discontinue products without notice.</p>
          <p>Prices for our products are subject to change without notice. All prices are displayed in USD. We reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>4. Billing and Account Information</h2>
          <p>We reserve the right to refuse any order you place with us. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed. We use authorized third-party payment processors (such as Stripe) and do not store your full credit card information on our servers.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>5. User Conduct & Intellectual Property</h2>
          <p>Unless otherwise stated, Pride & Joy and/or its licensors own the intellectual property rights for all material on the Site. All intellectual property rights are reserved. You may not reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>6. Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law, in no event will Pride & Joy, its affiliates, directors, officers, employees, agents, suppliers or licensors be liable to any person for any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>7. Governing Law & Dispute Resolution</h2>
          <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the State of California, USA, without regard to its conflict of law provisions. Any dispute arising from these terms will be resolved exclusively through binding arbitration in San Francisco, California.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>8. Contact Us</h2>
          <p>Questions about the Terms & Conditions should be sent to us at <a href="mailto:support@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>support@prideandjoy.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
