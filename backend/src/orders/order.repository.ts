import { Injectable } from "@nestjs/common";
import { Order } from "./order.types";

export const ORDER_REPOSITORY = "ORDER_REPOSITORY";

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
  save(order: Order): Order;
}

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<number, Order>();
  private nextId = 1;

  constructor() {
    // Seed with initial data
    this.seed();
  }

  private seed(): void {
    const seedOrders: Order[] = [
      {
        id: 1,
        customerName: "Almaz Bekele",
        area: "Bole",
        status: "PREPARING",
        dishes: [
          { name: "Doro Wat", priceSantim: 32000 },
          { name: "Shiro", priceSantim: 18000 },
        ],
        telebirrPhone: "+251911234567",
        totalSantim: 50000,
      },
      {
        id: 2,
        customerName: "Dawit Abebe",
        area: "Kazanchis",
        status: "PENDING",
        dishes: [
          { name: "Kitfo", priceSantim: 35000 },
          { name: "Tibs", priceSantim: 29000 },
        ],
        totalSantim: 64000,
      },
      {
        id: 3,
        customerName: "Sara Tekle",
        area: "Piassa",
        status: "ON_THE_WAY",
        dishes: [
          { name: "Firfir", priceSantim: 16000 },
          { name: "Gomen", priceSantim: 15000 },
        ],
        telebirrPhone: "+251922345678",
        totalSantim: 31000,
      },
      {
        id: 4,
        customerName: "Mikael Tadesse",
        area: "Megenagna",
        status: "DELIVERED",
        dishes: [
          { name: "Kik Alicha", priceSantim: 14000 },
          { name: "Misir Wat", priceSantim: 17000 },
        ],
        totalSantim: 31000,
      },
    ];

    for (const order of seedOrders) {
      this.orders.set(order.id, order);
      this.nextId = Math.max(this.nextId, order.id + 1);
    }
  }

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return Array.from(this.orders.values());
  }

  save(order: Order): Order {
    const saved = { ...order, id: order.id || this.nextId++ };
    this.orders.set(saved.id, saved);
    return saved;
  }
}
