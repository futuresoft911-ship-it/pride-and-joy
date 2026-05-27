import { getDashboardStats } from "@/app/actions/admin";

export const metadata = {
  title: "Admin Dashboard | Pride & Joy",
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      
      <div className="admin-grid">
        <div className="admin-card admin-stat">
          <span className="admin-stat-label">Total Revenue</span>
          <span className="admin-stat-value">${stats.totalRevenue.toFixed(2)}</span>
          <span className="admin-stat-trend admin-stat-trend--up">↑ live data</span>
        </div>
        <div className="admin-card admin-stat">
          <span className="admin-stat-label">Total Orders</span>
          <span className="admin-stat-value">{stats.totalOrders}</span>
          <span className="admin-stat-trend admin-stat-trend--up">↑ live data</span>
        </div>
        <div className="admin-card admin-stat">
          <span className="admin-stat-label">Avg Order Value</span>
          <span className="admin-stat-value">${stats.avgOrderValue.toFixed(2)}</span>
          <span className="admin-stat-trend admin-stat-trend--down">↓ live data</span>
        </div>
        <div className="admin-card admin-stat">
          <span className="admin-stat-label">Active Vendors</span>
          <span className="admin-stat-value">{stats.activeVendors}</span>
          <span className="admin-stat-trend admin-stat-trend--up">↑ live data</span>
        </div>
      </div>

      <div className="admin-grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <div className="admin-card">
          <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: 700 }}>Revenue Overview (Mock)</h2>
          <div style={{ height: "300px", background: "rgba(244, 37, 140, 0.05)", border: "2px dashed var(--border)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
            [ Sales Trend Line Chart Placeholder ]
          </div>
        </div>

        <div className="admin-card">
          <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
            Inventory Alerts
            <span className="admin-badge admin-badge--danger">3 Alerts</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontWeight: 600 }}>Love Is Love Tee</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Size: L, Color: Black</div>
              </div>
              <span style={{ color: "#e63946", fontWeight: 700 }}>2 left</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontWeight: 600 }}>Trans Joy Hoodie</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Size: XL, Color: Pink</div>
              </div>
              <span style={{ color: "#e63946", fontWeight: 700 }}>Out of Stock</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600 }}>Classic Pride Flag Tote</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>One Size</div>
              </div>
              <span style={{ color: "#ff8c00", fontWeight: 700 }}>5 left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
