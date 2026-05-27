import { getVendors } from "@/app/actions/admin";

export const metadata = {
  title: "Vendor Management | Pride & Joy Admin",
};

export default async function AdminVendors() {
  const vendors = await getVendors();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Vendors</h1>
        <button className="admin-btn admin-btn-primary">+ Add New Vendor</button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", gap: "1rem" }}>
          <input type="text" className="admin-input" placeholder="Search vendors by name or contact..." style={{ maxWidth: "400px" }} />
          <select className="admin-input" style={{ width: "auto" }}>
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending Approval</option>
            <option>Suspended</option>
          </select>
        </div>

        <div className="admin-table-container" style={{ border: "none", borderRadius: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Status</th>
                <th>Products</th>
                <th>Revenue Split</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>No vendors found</td>
                </tr>
              ) : (
                vendors.map(vendor => (
                  <tr key={vendor.id}>
                    <td><span style={{ fontWeight: 600 }}>{vendor.name}</span></td>
                    <td><span className="admin-badge admin-badge--success">Active</span></td>
                    <td>{vendor._count?.products || 0} Products</td>
                    <td>70% / 30%</td>
                    <td>
                      <div>{vendor.user?.name || "Unknown"}</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{vendor.user?.email || "N/A"}</div>
                    </td>
                    <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Manage</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
