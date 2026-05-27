import Link from "next/link";

export const metadata = {
  title: "Careers | Pride & Joy",
};

export default function CareersPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>Careers at Pride & Joy</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "1.2rem" }}>Join our mission to celebrate identity and self-expression through premium apparel.</p>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>Why Join Us?</h2>
          <p>At Pride & Joy, we believe that fashion is a powerful tool for visibility. Our team is a diverse, passionate group of creatives, operators, and advocates working together to build a brand that uplifts the LGBTQ+ community year-round.</p>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>Open Positions</h2>
          
          <div style={{ border: "1px solid var(--border)", padding: "1.5rem", borderRadius: "8px", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--primary)", marginBottom: "0.5rem" }}>Senior Apparel Designer</h3>
            <p style={{ marginBottom: "1rem" }}>Remote (US) • Full-time</p>
            <button className="btn btn-outline" style={{ padding: "0.5rem 1rem" }}>Apply Now</button>
          </div>

          <div style={{ border: "1px solid var(--border)", padding: "1.5rem", borderRadius: "8px", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--primary)", marginBottom: "0.5rem" }}>Community Manager</h3>
            <p style={{ marginBottom: "1rem" }}>New York, NY • Full-time</p>
            <button className="btn btn-outline" style={{ padding: "0.5rem 1rem" }}>Apply Now</button>
          </div>

          <p style={{ marginTop: "2rem" }}>Don't see a perfect fit? Send your resume and portfolio to <a href="mailto:jobs@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>jobs@prideandjoy.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
