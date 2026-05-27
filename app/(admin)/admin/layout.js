"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./admin-styles.css";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Catalog & Products", icon: "👕" },
  { href: "/admin/orders", label: "Orders & Fulfillment", icon: "📦" },
  { href: "/admin/vendors", label: "Vendors", icon: "🏪" },
  { href: "/admin/customers", label: "Customers (CRM)", icon: "👥" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-logo">
          <svg
            width="28"
            height="24"
            viewBox="0 0 32 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4C2 2.9 2.9 2 4 2H26C28 2 30 4 29 6C28 8 30 10 29 12C28 14 30 16 29 18C28 20 30 22 29 24C28 26 26 26 26 26H4C2.9 26 2 25.1 2 24V4Z"
              fill="#f4258c"
            />
            <path
              d="M6 8H22M6 13H20M6 18H22"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Admin
        </Link>

        <nav className="admin-nav">
          {ADMIN_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-nav-item ${isActive ? "admin-nav-item--active" : ""}`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-title">
            <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Command Center</span>
          </div>
          <div className="admin-header-actions">
            <Link href="/" className="admin-btn admin-btn-outline" target="_blank" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
              View Storefront
            </Link>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
