"use client";

import Link from "next/link";
import { deleteProduct } from "@/app/actions/products";
import { useState } from "react";

export default function ProductActions({ productId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productId);
    } catch (err) {
      alert("Failed to delete product");
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Link href={`/admin/products/${productId}/edit`} className="admin-btn admin-btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", textDecoration: "none" }}>
        Edit
      </Link>
      <button 
        onClick={handleDelete} 
        disabled={isDeleting} 
        className="admin-btn admin-btn-outline" 
        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", color: "var(--color-primary)", borderColor: "var(--color-primary)" }}
      >
        {isDeleting ? "..." : "Delete"}
      </button>
    </div>
  );
}
