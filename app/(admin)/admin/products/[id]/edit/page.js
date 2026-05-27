import { getProductById } from "@/app/actions/products";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Edit Product</h1>
      </div>

      <div className="admin-card">
        <EditProductForm product={product} />
      </div>
    </div>
  );
}
