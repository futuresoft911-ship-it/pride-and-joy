import Link from "next/link";

export const metadata = {
  title: "Size Guide | Pride & Joy",
};

export default function SizeGuidePage() {
  return (
    <main className="static-page">
      <div className="container" style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text)" }}>Size Guide</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "3rem", fontSize: "1.2rem" }}>Find your perfect fit. Our apparel is unisex and designed for all bodies.</p>
        
        <div className="static-content" style={{ lineHeight: "1.8", color: "var(--text)" }}>
          
          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>T-Shirts</h2>
          <p>Measurements are provided in inches. For the best fit, measure a shirt you already own that fits well and compare it to our chart.</p>
          
          <div style={{ overflowX: "auto", marginTop: "1.5rem", marginBottom: "3rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)", color: "var(--primary)" }}>
                  <th style={{ padding: "1rem" }}>Size</th>
                  <th style={{ padding: "1rem" }}>Length (in)</th>
                  <th style={{ padding: "1rem" }}>Width (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>S</td>
                  <td style={{ padding: "1rem" }}>28</td>
                  <td style={{ padding: "1rem" }}>18</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>M</td>
                  <td style={{ padding: "1rem" }}>29</td>
                  <td style={{ padding: "1rem" }}>20</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>L</td>
                  <td style={{ padding: "1rem" }}>30</td>
                  <td style={{ padding: "1rem" }}>22</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>XL</td>
                  <td style={{ padding: "1rem" }}>31</td>
                  <td style={{ padding: "1rem" }}>24</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>2XL</td>
                  <td style={{ padding: "1rem" }}>32</td>
                  <td style={{ padding: "1rem" }}>26</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>3XL</td>
                  <td style={{ padding: "1rem" }}>33</td>
                  <td style={{ padding: "1rem" }}>28</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem", color: "var(--accent)" }}>How to Measure</h2>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li><strong>Length:</strong> Place the end of the tape beside the collar at the top of the tee (Highest Point Shoulder). Pull the tape measure to the bottom of the shirt.</li>
            <li><strong>Width:</strong> Place the end of the tape at the seam under the sleeve and pull the tape measure across the shirt to the seam under the opposite sleeve.</li>
          </ul>

        </div>
      </div>
    </main>
  );
}
