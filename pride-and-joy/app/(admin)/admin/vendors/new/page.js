"use client";

import { createVendor } from "@/app/actions/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewVendorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    
    try {
      const res = await createVendor(formData);
      if (res.success) {
        router.push("/admin/vendors");
      } else {
        setError(res.error || "Failed to create vendor");
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
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Add New Vendor</h1>
        <button onClick={() => router.back()} className="admin-btn admin-btn-outline">Cancel</button>
      </div>

      <div className="admin-card">
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Vendor Company / Name</label>
            <input type="text" name="name" required className="admin-input" style={{ width: "100%", maxWidth: "600px" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Contact Email</label>
            <input type="email" name="email" required className="admin-input" style={{ width: "100%", maxWidth: "600px" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Description / Notes</label>
            <textarea name="description" rows="4" className="admin-input" style={{ width: "100%", maxWidth: "600px" }} />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
              {loading ? "Saving..." : "Save Vendor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
