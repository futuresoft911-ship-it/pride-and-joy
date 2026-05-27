import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CustomerProfilePage({ params }) {
  const { id } = await params;
  const customer = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!customer) return <div>Customer not found</div>;

  const totalSpent = customer.orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Customer Profile: {customer.name}</h1>
        <Link href="/admin/crm" className="admin-btn admin-btn-outline" style={{ textDecoration: "none" }}>Back to CRM</Link>
      </div>

      <div className="admin-card" style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Details</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <strong>Email:</strong> <br/> {customer.email}
          </div>
          <div>
            <strong>Total Spent:</strong> <br/> ${totalSpent.toFixed(2)}
          </div>
          <div>
            <strong>Orders Count:</strong> <br/> {customer.orders.length}
          </div>
          <div>
            <strong>Joined:</strong> <br/> {new Date(customer.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Order History</h2>
      {customer.orders.length === 0 ? (
        <div className="admin-card">No orders found for this customer.</div>
      ) : (
        <div className="admin-card" style={{ padding: 0 }}>
          <div className="admin-table-container" style={{ border: "none", borderRadius: 0 }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customer.orders.map(order => (
                  <tr key={order.id}>
                    <td><span style={{ fontWeight: 600, color: "var(--accent)" }}>{order.orderNumber}</span></td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${order.status === 'PENDING' ? 'warning' : 'success'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
