"use server";

import { prisma } from "@/lib/prisma";

export async function createOrder({ customerInfo, items, total }) {
  try {
    // 1. Create or find Customer
    let customer = await prisma.user.findUnique({
      where: { email: customerInfo.email }
    });

    if (!customer) {
      customer = await prisma.user.create({
        data: {
          name: customerInfo.fullName,
          email: customerInfo.email,
          role: "USER"
        }
      });
    }

    // Generate Order Number
    const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    // Ensure all items map to an actual variant in DB.
    // For now we assume items has variantId or productId. Since cart items just have id (productId), size, color.
    // We will look up the variant.
    const orderItems = [];
    
    for (const item of items) {
      // Find variant by productId, size, color
      const variant = await prisma.productVariant.findFirst({
        where: {
          productId: item.id.toString(), // or item.id if already string
          size: item.size,
          // color match is tricky, maybe fallback to first if color not found
        }
      });
      
      if (variant) {
        orderItems.push({
          variantId: variant.id,
          quantity: item.quantity,
          price: item.price
        });
      }
    }

    // 2. Create Order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        totalAmount: total,
        status: "PENDING",
        items: {
          create: orderItems
        }
      }
    });

    return { success: true, orderNumber: order.orderNumber };

  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

import { revalidatePath } from "next/cache";

export async function updateOrderStatus(id, newStatus) {
  try {
    await prisma.order.update({
      where: { id },
      data: { status: newStatus }
    });
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order:", error);
    return { success: false, error: "Failed to update order status" };
  }
}

export async function deleteOrder(id) {
  try {
    // Delete order items first
    await prisma.orderItem.deleteMany({ where: { orderId: id } });
    await prisma.order.delete({ where: { id } });
    
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete order:", error);
    return { success: false, error: "Failed to delete order" };
  }
}
