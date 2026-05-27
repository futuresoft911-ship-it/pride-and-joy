export const metadata = {
  title: "Orders & Fulfillment | Pride & Joy Admin",
};

export default function AdminOrders() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Orders & Fulfillment</h1>
        <button className="admin-btn admin-btn-primary">Export CSV</button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", gap: "1rem" }}>
          <input type="text" className="admin-input" placeholder="Search orders by ID, customer name, or email..." style={{ maxWidth: "400px" }} />
          <select className="admin-input" style={{ width: "auto" }}>
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>

        <div className="admin-table-container" style={{ border: "none", borderRadius: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>#ORD-2026-9042</td>
                <td>May 27, 2026</td>
                <td>
                  <div>Alex Morgan</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>alex.m@example.com</div>
                </td>
                <td style={{ fontWeight: 600 }}>$74.98</td>
                <td><span className="admin-badge admin-badge--warning">Processing</span></td>
                <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>View Details</button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#ORD-2026-9041</td>
                <td>May 26, 2026</td>
                <td>
                  <div>Sam Rivera</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>sam.rivera@example.com</div>
                </td>
                <td style={{ fontWeight: 600 }}>$34.99</td>
                <td><span className="admin-badge admin-badge--success">Shipped</span></td>
                <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>View Details</button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#ORD-2026-9040</td>
                <td>May 25, 2026</td>
                <td>
                  <div>Jamie Chen</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>j.chen99@example.com</div>
                </td>
                <td style={{ fontWeight: 600 }}>$112.50</td>
                <td><span className="admin-badge admin-badge--info">Delivered</span></td>
                <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>View Details</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
