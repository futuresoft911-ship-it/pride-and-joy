"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  try {
    // Basic aggregates
    const totalOrders = await prisma.order.count();
    
    const revenueAgg = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      }
    });
    const totalRevenue = revenueAgg._sum.totalAmount || 0;
    
    const activeVendors = await prisma.vendor.count();

    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      activeVendors,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0, activeVendors: 0 };
  }
}

export async function getRecentOrders(limit = 5) {
  try {
    const orders = await prisma.order.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        customer: true,
      }
    });
    return orders;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }
}

export async function getLowStockVariants(threshold = 10) {
  try {
    const variants = await prisma.productVariant.findMany({
      where: {
        stock: {
          lte: threshold
        }
      },
      include: {
        product: true
      },
      orderBy: {
        stock: 'asc'
      }
    });
    return variants;
  } catch (error) {
    console.error("Error fetching low stock variants:", error);
    return [];
  }
}

export async function getVendors() {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        user: true,
        _count: {
          select: { products: true }
        }
      }
    });
    return vendors;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return [];
  }
}

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "USER"
      },
      include: {
        _count: {
          select: { orders: true }
        },
        orders: {
          select: { totalAmount: true }
        }
      }
    });
    
    // Calculate total spend
    return customers.map(c => {
      const totalSpend = c.orders.reduce((sum, order) => sum + order.totalAmount, 0);
      return {
        ...c,
        totalSpend
      };
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
}
