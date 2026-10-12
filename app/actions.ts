"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "../lib/schema";
import { createOrder, cancelOrder, getOrder } from "../lib/orders";
import type { OrderFormData } from "../lib/schema";

type State = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
  success?: boolean;
  order?: any;
};

export async function placeOrder(
  prevState: State | null,
  formData: FormData
): Promise<State> {
  // Extract data from FormData
  const data: OrderFormData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
  };

  // Get cart items from hidden field
  const cartItemsJson = formData.get("cartItems") as string;
  const cartItems = JSON.parse(cartItemsJson);

  // Validate with the same schema used by the client form
  const result = orderSchema.safeParse(data);
  
  if (!result.success) {
    return {
      error: "Validation failed",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  // Create order
  const order = createOrder(result.data, cartItems);
  
  // Revalidate any cached pages that might show orders
  revalidatePath("/orders");
  
  return { success: true, order };
}

export async function cancelOrderAction(orderId: string) {
  // In a real app, you would check session and ownership here
  // const user = await getSession();
  // if (!user) throw new Error("Not signed in");
  // const order = await getOrder(orderId);
  // if (order.userId !== user.id) throw new Error("Not yours");
  
  const order = cancelOrder(orderId);
  
  if (!order) {
    return { error: "Order not found" };
  }
  
  revalidatePath("/orders");
  
  return { success: true, order };
}
