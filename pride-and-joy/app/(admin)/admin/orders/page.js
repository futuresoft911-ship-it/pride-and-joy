import { getRecentOrders } from "@/app/actions/admin";

export const metadata = {
  title: "Orders Management | Pride & Joy Admin",
};

export default async function AdminOrders() {
  const orders = await getRecentOrders(50);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Orders</h1>
        <button className="admin-btn admin-btn-outline">Export CSV</button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", gap: "1rem" }}>
          <input type="text" className="admin-input" placeholder="Search orders by ID, customer..." style={{ maxWidth: "400px" }} />
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
                <th>Payment</th>
                <th>Fulfillment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "2rem" }}>No orders found</td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td><span style={{ fontWeight: 600, color: "var(--accent)" }}>{order.orderNumber}</span></td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.customer ? order.customer.name : "Guest"}</td>
                    <td><span style={{ fontWeight: 600 }}>${order.totalAmount.toFixed(2)}</span></td>
                    <td><span className="admin-badge admin-badge--success">Paid</span></td>
                    <td>
                      <span className={`admin-badge admin-badge--${order.status === 'PENDING' ? 'warning' : 'success'}`}>
                        {order.status === 'PENDING' ? 'Unfulfilled' : order.status}
                      </span>
                    </td>
                    <td><button className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>View</button></td>
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
