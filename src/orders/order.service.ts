// Day 53 - In-Class Exercise: Order Service

import { Order, Area } from "./order.types";
import { OrderNotFoundError } from "./order.errors";
import { OrderRepository } from "./order.repository";

export class OrderService {
  // Cache using Map for efficient lookups
  private readonly cache = new Map<number, Order>();

  // Parameter properties: declare and assign in constructor
  constructor(private readonly repo: OrderRepository) {}

  // Find order by ID, throw if not found
  find(id: number): Order {
    const hit = this.cache.get(id) ?? this.repo.byId(id);
    if (!hit) {
      throw new OrderNotFoundError(id);
    }
    this.cache.set(id, hit);
    return hit;
  }

  // Return delivery fees by area as a Record
  feesByArea(): Record<Area, number> {
    return {
      Bole: 4000,
      Kazanchis: 6000,
      Piassa: 6000,
      Megenagna: 6000,
    };
  }

  // Generic method to extract a field from all orders
  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repo.all().map((order) => order[key]);
  }
}
