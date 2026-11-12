// Day 53 - In-Class Exercise: Order Repository

import { Order } from "./order.types";

// Interface defining the contract for order storage
export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
}

// In-memory implementation using Map for efficient lookups
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<number, Order>();

  constructor(seedOrders: Order[] = []) {
    for (const order of seedOrders) {
      this.orders.set(order.id, order);
    }
  }

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return Array.from(this.orders.values());
  }

  // Helper method to add orders (not in interface, for seeding)
  add(order: Order): void {
    this.orders.set(order.id, order);
  }
}
