import Link from "next/link";

export const metadata = {
  title: "Press | Pride & Joy",
};

export default function PressPage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>Press & Media</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "1.2rem" }}>Recent news, features, and press releases about Pride & Joy.</p>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          
          <div style={{ marginBottom: "3rem" }}>
            <span style={{ color: "var(--primary)", fontSize: "0.9rem", fontWeight: "bold", textTransform: "uppercase" }}>June 2025</span>
            <h3 style={{ fontSize: "1.4rem", margin: "0.5rem 0" }}>Pride & Joy Launches the Unity Collection</h3>
            <p>Our highly anticipated Unity Collection drops, featuring collaborations with 5 independent LGBTQ+ artists. Read the full story on <em>Queer Fashion Monthly</em>.</p>
          </div>

          <div style={{ marginBottom: "3rem" }}>
            <span style={{ color: "var(--primary)", fontSize: "0.9rem", fontWeight: "bold", textTransform: "uppercase" }}>March 2025</span>
            <h3 style={{ fontSize: "1.4rem", margin: "0.5rem 0" }}>How Pride & Joy is Redefining Queer Apparel</h3>
            <p>A deep dive into our manufacturing process, sustainable sourcing, and community impact. Featured in <em>Vogue Business</em>.</p>
          </div>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>Media Inquiries</h2>
          <p>For press inquiries, interviews, or media kits, please contact our PR team at <a href="mailto:press@prideandjoy.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>press@prideandjoy.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
