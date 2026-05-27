export const metadata = {
  title: "Settings | Pride & Joy Admin",
};

export default function AdminSettings() {
  return (
    <div>
      <h1 className="admin-page-title">Platform Settings</h1>

      <div className="admin-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        
        {/* Discount Engine */}
        <div className="admin-card">
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: 700 }}>Discount Engine</h2>
          <div className="admin-form-group">
            <label className="admin-label">Promo Code</label>
            <input type="text" className="admin-input" defaultValue="PRIDE2026" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Discount Type</label>
            <select className="admin-input">
              <option>Percentage Off (%)</option>
              <option>Fixed Amount ($)</option>
              <option>Free Shipping</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Value</label>
            <input type="number" className="admin-input" defaultValue="15" />
          </div>
          <button className="admin-btn admin-btn-outline" style={{ width: "100%" }}>Create Promo Code</button>
        </div>

        {/* Global Configuration */}
        <div className="admin-card">
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: 700 }}>Shipping & Tax Configuration</h2>
          <div className="admin-form-group">
            <label className="admin-label">Default Domestic Flat Rate ($)</label>
            <input type="number" className="admin-input" defaultValue="5.00" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Free Shipping Threshold ($)</label>
            <input type="number" className="admin-input" defaultValue="50.00" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Tax Calculation Provider</label>
            <select className="admin-input">
              <option>Stripe Tax</option>
              <option>TaxJar</option>
              <option>Manual Flat Rates</option>
            </select>
          </div>
          <button className="admin-btn admin-btn-primary" style={{ width: "100%" }}>Save Configuration</button>
        </div>
      </div>
    </div>
  );
}
