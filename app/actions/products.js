"use server";

import { prisma } from "@/lib/prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
        vendor: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    
    // Map to frontend expected shape
    return products.map(p => ({
      ...p,
      price: p.variants?.[0]?.price || 0,
      badge: p.tags,
      rating: 4.8, // Mocked for now
      reviewCount: Math.floor(Math.random() * 200) + 50,
      sizes: [...new Set(p.variants.map(v => v.size))],
      colors: [...new Set(p.variants.map(v => v.color))].map(c => ({ name: c, hex: '#000000' })) // simplified color map
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
        vendor: true,
      },
    });
    
    if (!product) return null;
    
    return {
      ...product,
      price: product.variants?.[0]?.price || 0,
      badge: product.tags,
      rating: 4.8, // Mocked for now
      reviewCount: Math.floor(Math.random() * 200) + 50,
      sizes: [...new Set(product.variants.map(v => v.size))],
      colors: [...new Set(product.variants.map(v => v.color))].map(c => ({ name: c, hex: '#000000' }))
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getProductsByCategory(category) {
  if (!category || category === "All") {
    return getProducts();
  }
  
  try {
    const products = await prisma.product.findMany({
      where: { category },
      include: {
        variants: true,
        vendor: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    
    return products.map(p => ({
      ...p,
      price: p.variants?.[0]?.price || 0,
      badge: p.tags,
      rating: 4.8, // Mocked for now
      reviewCount: Math.floor(Math.random() * 200) + 50,
      sizes: [...new Set(p.variants.map(v => v.size))],
      colors: [...new Set(p.variants.map(v => v.color))].map(c => ({ name: c, hex: '#000000' }))
    }));
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function getRelatedProducts(productId, limit = 4) {
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return [];
    
    // Simple related: same category, different ID
    const related = await prisma.product.findMany({
      where: {
        category: product.category,
        id: { not: productId }
      },
      include: {
        variants: true,
        vendor: true,
      },
      take: limit,
    });
    
    return related.map(p => ({
      ...p,
      price: p.variants?.[0]?.price || 0,
      badge: p.tags,
      rating: 4.8,
      reviewCount: Math.floor(Math.random() * 200) + 50,
      sizes: [...new Set(p.variants.map(v => v.size))],
      colors: [...new Set(p.variants.map(v => v.color))].map(c => ({ name: c, hex: '#000000' }))
    }));
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

import { revalidatePath } from "next/cache";

export async function deleteProduct(id) {
  try {
    // Delete associated variants first
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }
}

export async function createProduct(formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = parseFloat(formData.get("price"));
    const stock = parseInt(formData.get("stock"));
    const image = formData.get("image") || "/images/placeholder.png";
    const tags = formData.get("tags") || "New";
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const sizes = formData.getAll("sizes");
    const colorsString = formData.get("colors");
    const colors = colorsString ? colorsString.split(",").map(c => c.trim()).filter(Boolean) : ["Default"];
    
    if (sizes.length === 0) sizes.push("ONE_SIZE");

    const variantData = [];
    for (const size of sizes) {
      for (const color of colors) {
        variantData.push({
          size,
          color,
          price,
          stock,
          sku: `${slug}-${size}-${color}`.substring(0, 30).toUpperCase().replace(/[^A-Z0-9-]/g, '-')
        });
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        category,
        image,
        tags,
        variants: {
          create: variantData
        }
      }
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id, formData) {
  try {
    const name = formData.get("name");
    const category = formData.get("category");

    await prisma.product.update({
      where: { id },
      data: { name, category }
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }
}
