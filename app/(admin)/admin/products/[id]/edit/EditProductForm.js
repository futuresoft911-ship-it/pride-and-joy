"use client";

import { updateProduct } from "@/app/actions/products";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProductForm({ product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    
    try {
      const res = await updateProduct(product.id, formData);
      if (res.success) {
        router.push("/admin/products");
      } else {
        setError(res.error || "Failed to update product");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Product Name</label>
        <input type="text" name="name" defaultValue={product.name} required className="admin-input" style={{ width: "100%", maxWidth: "600px" }} />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Category</label>
        <select name="category" defaultValue={product.category} className="admin-input" style={{ width: "100%", maxWidth: "600px" }}>
          <option value="Pride Collection">Pride Collection</option>
          <option value="Best Sellers">Best Sellers</option>
          <option value="New Arrivals">New Arrivals</option>
        </select>
      </div>
      
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={() => router.back()} disabled={loading} className="admin-btn admin-btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
