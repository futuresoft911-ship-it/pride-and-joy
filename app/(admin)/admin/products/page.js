import { getProducts } from "@/app/actions/products";
import Image from "next/image";
import Link from "next/link";
import ProductActions from "./ProductActions";

export const metadata = {
  title: "Catalog Management | Pride & Joy Admin",
};

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Catalog & Products</h1>
        <Link href="/admin/products/new" className="admin-btn admin-btn-primary" style={{ textDecoration: "none" }}>+ Add New Product</Link>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", gap: "1rem" }}>
          <input type="text" className="admin-input" placeholder="Search products by name, SKU, or tag..." style={{ maxWidth: "400px" }} />
          <select className="admin-input" style={{ width: "auto" }}>
            <option>All Categories</option>
            <option>Best Sellers</option>
            <option>Pride Collection</option>
            <option>Sale</option>
            <option>New Arrivals</option>
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
              {products.map(product => {
                const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
                const stockStatus = totalStock > 10 ? 'success' : totalStock > 0 ? 'warning' : 'danger';
                const stockLabel = totalStock > 0 ? `${totalStock} in stock` : 'Out of stock';

                return (
                  <tr key={product.id}>
                    <td style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: "40px", height: "40px", background: "#f0f0f0", borderRadius: "4px", overflow: "hidden", position: "relative" }}>
                        <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{product.name}</div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Category: {product.category}</div>
                      </div>
                    </td>
                    <td><span className={`admin-badge admin-badge--${totalStock > 0 ? 'success' : 'danger'}`}>{totalStock > 0 ? 'Active' : 'Out of Stock'}</span></td>
                    <td>{product.variants?.length || 0}</td>
                    <td><span style={{ color: stockStatus === 'danger' ? "#e63946" : stockStatus === 'warning' ? "#ff8c00" : "inherit", fontWeight: 600 }}>{stockLabel}</span></td>
                    <td>{product.vendor ? product.vendor.name : 'In-House'}</td>
                    <td><ProductActions productId={product.id} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
