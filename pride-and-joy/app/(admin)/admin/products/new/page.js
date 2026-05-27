"use client";

import { createProduct } from "@/app/actions/products";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    
    try {
      const res = await createProduct(formData);
      if (res.success) {
        router.push("/admin/products");
      } else {
        setError(res.error || "Failed to create product");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Add New Product</h1>
        <button onClick={() => router.back()} className="admin-btn admin-btn-outline">Cancel</button>
      </div>

      <div className="admin-card">
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Product Name</label>
            <input type="text" name="name" required className="admin-input" style={{ width: "100%", maxWidth: "600px" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Category</label>
            <select name="category" className="admin-input" style={{ width: "100%", maxWidth: "600px" }}>
              <option value="Pride Collection">Pride Collection</option>
              <option value="Best Sellers">Best Sellers</option>
              <option value="New Arrivals">New Arrivals</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Description</label>
            <textarea name="description" rows="4" required className="admin-input" style={{ width: "100%", maxWidth: "600px" }} />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1, maxWidth: "290px" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Price ($)</label>
              <input type="number" step="0.01" name="price" required className="admin-input" style={{ width: "100%" }} />
            </div>
            <div style={{ flex: 1, maxWidth: "290px" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Initial Stock</label>
              <input type="number" name="stock" required className="admin-input" style={{ width: "100%" }} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Image URL (Optional)</label>
            <input type="text" name="image" placeholder="/images/placeholder.png" className="admin-input" style={{ width: "100%", maxWidth: "600px" }} />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
