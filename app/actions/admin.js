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

import { revalidatePath } from "next/cache";

export async function createVendor(formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          role: "VENDOR"
        }
      });
    } else {
      // Update role if user already exists
      await prisma.user.update({
        where: { email },
        data: { role: "VENDOR" }
      });
    }

    // Create vendor profile
    await prisma.vendor.create({
      data: {
        name,
        userId: user.id
      }
    });

    revalidatePath("/admin/vendors");
    return { success: true };
  } catch (error) {
    console.error("Error creating vendor:", error);
    return { success: false, error: "Failed to create vendor" };
  }
}

export async function updateVendor(formData) {
  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const commissionRate = parseFloat(formData.get("commissionRate"));

    await prisma.vendor.update({
      where: { id },
      data: { name, commissionRate }
    });

    revalidatePath("/admin/vendors");
    return { success: true };
  } catch (error) {
    console.error("Error updating vendor:", error);
    return { success: false, error: "Failed to update vendor" };
  }
}

export async function deleteVendor(id) {
  try {
    const vendor = await prisma.vendor.findUnique({ where: { id } });
    if (!vendor) return { success: false, error: "Vendor not found" };

    // Delete products associated with vendor
    await prisma.product.updateMany({
      where: { vendorId: id },
      data: { vendorId: null }
    });

    await prisma.vendor.delete({ where: { id } });
    await prisma.user.delete({ where: { id: vendor.userId } });

    revalidatePath("/admin/vendors");
    return { success: true };
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return { success: false, error: "Failed to delete vendor" };
  }
}

export async function deleteCustomer(id) {
  try {
    // Delete orders first
    await prisma.order.deleteMany({ where: { customerId: id } });
    // Delete user
    await prisma.user.delete({ where: { id } });

    revalidatePath("/admin/crm");
    return { success: true };
  } catch (error) {
    console.error("Error deleting customer:", error);
    return { success: false, error: "Failed to delete customer" };
  }
}
