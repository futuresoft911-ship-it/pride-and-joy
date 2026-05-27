import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { updateVendor } from "@/app/actions/admin";

export default async function ManageVendorPage({ params }) {
  const { id } = await params;
  const vendor = await prisma.vendor.findUnique({
    where: { id },
    include: { user: true }
  });

  if (!vendor) return <div>Vendor not found</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Manage Vendor: {vendor.name}</h1>
      </div>

      <div className="admin-card">
        <form action={updateVendor} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <input type="hidden" name="id" value={vendor.id} />
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Vendor Company / Name</label>
            <input type="text" name="name" defaultValue={vendor.name} required className="admin-input" style={{ width: "100%", maxWidth: "600px" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Commission Rate (%)</label>
            <input type="number" step="0.1" name="commissionRate" defaultValue={vendor.commissionRate} required className="admin-input" style={{ width: "100%", maxWidth: "600px" }} />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
