"use client";

import { useState } from "react";
import { updateOrderStatus, deleteOrder } from "@/app/actions/orders";
import { useRouter } from "next/navigation";

export default function OrderActions({ order }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await updateOrderStatus(order.id, newStatus);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setIsDeleting(true);
    try {
      await deleteOrder(order.id);
    } catch (err) {
      alert("Failed to delete order");
      setIsDeleting(false);
    }
  };

  const handlePrint = () => {
    // Open a simple printable window
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Shipping Label - ${order.orderNumber}</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; max-width: 500px; margin: 0 auto; }
            .label { border: 2px solid #000; padding: 2rem; border-radius: 8px; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 1rem; margin-bottom: 1rem; }
            h1 { margin: 0; font-size: 1.5rem; }
            .address { font-size: 1.2rem; line-height: 1.6; margin-bottom: 2rem; }
            .barcode { text-align: center; font-family: monospace; font-size: 2rem; letter-spacing: 5px; margin-top: 2rem; border-top: 2px dashed #ccc; padding-top: 1rem; }
            @media print { body { padding: 0; margin: 0; } .label { border: none; } }
          </style>
        </head>
        <body>
          <div class="label">
            <div class="header">
              <h1>PRIORITY MAIL</h1>
              <strong>${new Date().toLocaleDateString()}</strong>
            </div>
            <div><strong>FROM:</strong><br/>Pride & Joy Apparel<br/>123 Pride Ave<br/>San Francisco, CA 94114</div>
            <br/><br/>
            <div class="address">
              <strong>TO:</strong><br/>
              ${order.customer?.name || 'Customer'}<br/>
              ${order.customer?.email || 'No email provided'}<br/>
              United States
            </div>
            <div class="barcode">|| | ||| |||| | ||| ||</div>
            <div style="text-align: center; margin-top: 0.5rem; font-family: monospace;">${order.orderNumber}</div>
          </div>
          <script>
            window.onload = () => { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <select 
        defaultValue={order.status} 
        onChange={handleStatusChange} 
        className="admin-input" 
        style={{ padding: "0.4rem", fontSize: "0.8rem", width: "110px", margin: 0, height: "30px" }}
      >
        <option value="PENDING">Pending</option>
        <option value="PROCESSING">Processing</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
      </select>
      
      <button 
        onClick={handlePrint}
        className="admin-btn admin-btn-outline" 
        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", height: "30px" }}
      >
        Print Label
      </button>

      <button 
        onClick={handleDelete} 
        disabled={isDeleting} 
        className="admin-btn admin-btn-outline" 
        style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", color: "var(--color-primary)", borderColor: "var(--color-primary)", height: "30px" }}
      >
        {isDeleting ? "..." : "Delete"}
      </button>
    </div>
  );
}
