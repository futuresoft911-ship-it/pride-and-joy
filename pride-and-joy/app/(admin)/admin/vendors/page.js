export const metadata = {
  title: "Vendor Management | Pride & Joy Admin",
};

export default function AdminVendors() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Vendor Management</h1>
        <button className="admin-btn admin-btn-primary">+ Invite Vendor</button>
      </div>

      <div className="admin-grid" style={{ marginBottom: "2rem" }}>
        <div className="admin-card admin-stat">
          <span className="admin-stat-label">Pending Approvals</span>
          <span className="admin-stat-value">3</span>
          <span className="admin-stat-trend admin-stat-trend--down">Action Required</span>
        </div>
        <div className="admin-card admin-stat">
          <span className="admin-stat-label">Total Payouts (Month)</span>
          <span className="admin-stat-value">$14,250</span>
          <span className="admin-stat-trend admin-stat-trend--up">Stripe Connect synced</span>
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        <div className="admin-table-container" style={{ border: "none", borderRadius: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Status</th>
                <th>Products Listed</th>
                <th>Commission Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>QueerThreads</td>
                <td><span className="admin-badge admin-badge--success">Active</span></td>
                <td>14</td>
                <td>15%</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Manage</button>
                    <button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Impersonate</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Rainbow Collective</td>
                <td><span className="admin-badge admin-badge--success">Active</span></td>
                <td>8</td>
                <td>15%</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Manage</button>
                    <button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Impersonate</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Trans Art Studio</td>
                <td><span className="admin-badge admin-badge--warning">Pending</span></td>
                <td>0</td>
                <td>--</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Review App</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
