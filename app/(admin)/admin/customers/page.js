export const metadata = {
  title: "CRM | Pride & Joy Admin",
};

export default function AdminCustomers() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Customers (CRM)</h1>
        <button className="admin-btn admin-btn-primary">Export Segments</button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", gap: "1rem" }}>
          <input type="text" className="admin-input" placeholder="Search by name, email, or phone..." style={{ maxWidth: "400px" }} />
          <select className="admin-input" style={{ width: "auto" }}>
            <option>All Segments</option>
            <option>VIPs (&gt;$500 spend)</option>
            <option>Repeat Purchasers</option>
            <option>Churn Risk</option>
          </select>
        </div>

        <div className="admin-table-container" style={{ border: "none", borderRadius: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Segment</th>
                <th>Total Spend</th>
                <th>Orders</th>
                <th>Active Tickets</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style={{ fontWeight: 600 }}>Taylor Swift</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>taylor@example.com</div>
                </td>
                <td><span className="admin-badge admin-badge--info">VIP</span></td>
                <td style={{ fontWeight: 600 }}>$1,240.00</td>
                <td>14</td>
                <td>0</td>
                <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Profile</button></td>
              </tr>
              <tr>
                <td>
                  <div style={{ fontWeight: 600 }}>Jordan Lee</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>jordan.l@example.com</div>
                </td>
                <td><span className="admin-badge admin-badge--success">Repeat</span></td>
                <td style={{ fontWeight: 600 }}>$125.50</td>
                <td>3</td>
                <td><span style={{ color: "#e63946", fontWeight: 700 }}>1 (Exchange)</span></td>
                <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Profile</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
