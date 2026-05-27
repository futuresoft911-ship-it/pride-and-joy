"use client";

import { useState } from "react";
import { deleteCustomer } from "@/app/actions/admin";
import Link from "next/link";

export default function CustomerActions({ customerId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to completely erase this customer? This will also delete their order history.")) return;
    setIsDeleting(true);
    try {
      await deleteCustomer(customerId);
    } catch (err) {
      alert("Failed to delete customer");
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Link 
        href={`/admin/crm/${customerId}`}
        className="admin-btn admin-btn-outline" 
        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", textDecoration: "none" }}
      >
        View Profile
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
