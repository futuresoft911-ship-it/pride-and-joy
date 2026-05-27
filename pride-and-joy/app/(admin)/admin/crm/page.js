import { getCustomers } from "@/app/actions/admin";

export const metadata = {
  title: "Customers (CRM) | Pride & Joy Admin",
};

export default async function AdminCRM() {
  const customers = await getCustomers();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Customers & CRM</h1>
        <button className="admin-btn admin-btn-primary">Export Data</button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", gap: "1rem" }}>
          <input type="text" className="admin-input" placeholder="Search customers by name, email..." style={{ maxWidth: "400px" }} />
          <select className="admin-input" style={{ width: "auto" }}>
            <option>All Segments</option>
            <option>VIP Customers</option>
            <option>Recent Buyers</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="admin-table-container" style={{ border: "none", borderRadius: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Total Orders</th>
                <th>Lifetime Value</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>No customers found</td>
                </tr>
              ) : (
                customers.map(customer => (
                  <tr key={customer.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{customer.name}</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{customer.email}</div>
                    </td>
                    <td><span className={`admin-badge admin-badge--${customer.totalSpend > 100 ? 'success' : 'info'}`}>
                      {customer.totalSpend > 100 ? 'VIP' : 'Active'}
                    </span></td>
                    <td>{customer._count?.orders || 0}</td>
                    <td><span style={{ fontWeight: 600 }}>${customer.totalSpend.toFixed(2)}</span></td>
                    <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>View Profile</button>
                    </td>
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
