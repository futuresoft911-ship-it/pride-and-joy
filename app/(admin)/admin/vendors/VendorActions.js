"use client";

import { useState } from "react";
import { deleteVendor } from "@/app/actions/admin";
import Link from "next/link";

export default function VendorActions({ vendorId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this vendor and their account?")) return;
    setIsDeleting(true);
    try {
      await deleteVendor(vendorId);
    } catch (err) {
      alert("Failed to delete vendor");
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Link 
        href={`/admin/vendors/${vendorId}/edit`}
        className="admin-btn admin-btn-outline" 
        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", textDecoration: "none" }}
      >
        Manage
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
