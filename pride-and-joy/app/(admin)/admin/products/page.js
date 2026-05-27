export const metadata = {
  title: "Catalog Management | Pride & Joy Admin",
};

export default function AdminProducts() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Catalog & Products</h1>
        <button className="admin-btn admin-btn-primary">+ Add New Product</button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", gap: "1rem" }}>
          <input type="text" className="admin-input" placeholder="Search products by name, SKU, or tag..." style={{ maxWidth: "400px" }} />
          <select className="admin-input" style={{ width: "auto" }}>
            <option>All Categories</option>
            <option>T-Shirts</option>
            <option>Hoodies</option>
            <option>Accessories</option>
          </select>
        </div>

        <div className="admin-table-container" style={{ border: "none", borderRadius: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Status</th>
                <th>Variants</th>
                <th>Inventory</th>
                <th>Vendor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", background: "#f0f0f0", borderRadius: "4px" }}></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Love Is Love Tee</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>SKU: TEE-LIL-001</div>
                  </div>
                </td>
                <td><span className="admin-badge admin-badge--success">Active</span></td>
                <td>12 (S-2XL, 3 Colors)</td>
                <td><span style={{ color: "#ff8c00", fontWeight: 600 }}>24 in stock</span></td>
                <td>In-House</td>
                <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Edit</button></td>
              </tr>
              <tr>
                <td style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", background: "#f0f0f0", borderRadius: "4px" }}></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Trans Joy Hoodie</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>SKU: HOOD-TJ-002</div>
                  </div>
                </td>
                <td><span className="admin-badge admin-badge--success">Active</span></td>
                <td>6 (S-XL, 2 Colors)</td>
                <td><span style={{ color: "#e63946", fontWeight: 600 }}>Out of stock</span></td>
                <td>Vendor: QueerThreads</td>
                <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Edit</button></td>
              </tr>
              <tr>
                <td style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", background: "#f0f0f0", borderRadius: "4px" }}></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Pride Flag Enamel Pin</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>SKU: ACC-PIN-003</div>
                  </div>
                </td>
                <td><span className="admin-badge admin-badge--warning">Draft</span></td>
                <td>1 (One Size)</td>
                <td>150 in stock</td>
                <td>In-House</td>
                <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
