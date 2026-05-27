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
