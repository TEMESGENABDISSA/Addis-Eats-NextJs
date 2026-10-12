import type { OrderFormData } from "./schema";

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
};

// In-memory orders storage (in production, this would be a database)
let orders: Order[] = [];

export function createOrder(data: OrderFormData, cartItems: Array<{ id: string; name: string; price: number; quantity: number }>): Order {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const order: Order = {
    id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: data.name,
    phone: data.phone,
    address: data.address,
    items: cartItems,
    total,
    status: "pending",
    createdAt: new Date(),
  };
  
  orders.push(order);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return orders.find((order) => order.id === id);
}

export function getAllOrders(): Order[] {
  return orders;
}

export function cancelOrder(id: string): Order | undefined {
  const order = orders.find((order) => order.id === id);
  if (order) {
    order.status = "cancelled";
  }
  return order;
}
