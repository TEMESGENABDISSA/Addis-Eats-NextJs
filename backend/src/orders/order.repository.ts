import { Injectable } from "@nestjs/common";
import { Order } from "./order.types";
import { SEED } from "./orders.seed";

export const ORDER_REPOSITORY = "ORDER_REPOSITORY";

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
  save(order: Order): Order;
  delete(id: number): void;
}

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<number, Order>(
    SEED.map((o) => [o.id, o]),
  );
  private nextId = Math.max(0, ...SEED.map((o) => o.id)) + 1;

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return [...this.orders.values()];
  }

  save(order: Order): Order {
    const saved = { ...order, id: order.id || this.nextId++ };
    this.orders.set(saved.id, saved);
    return saved;
  }

  delete(id: number): void {
    this.orders.delete(id);
  }
}
