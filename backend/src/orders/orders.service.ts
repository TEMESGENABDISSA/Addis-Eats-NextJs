import { Injectable, Inject } from "@nestjs/common";
import { Order, Area, OrderStatus } from "./order.types";
import { OrderNotFoundError } from "./order.errors";
import { OrderRepository, ORDER_REPOSITORY } from "./order.repository";
import { FindOrdersQuery } from "./dto/find-orders.query";
import { Page } from "../common/page";

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly repo: OrderRepository,
  ) {}

  findAll(q: FindOrdersQuery): Page<Order> {
    let rows = this.repo.all();

    // Filter
    if (q.status) rows = rows.filter((o) => o.status === q.status);
    if (q.area) rows = rows.filter((o) => o.area === q.area);

    // Sort (copy first to avoid mutation)
    rows = [...rows].sort((a, b) =>
      a[q.sort].localeCompare(b[q.sort]),
    );

    // Page
    const total = rows.length;
    const items = rows.slice(q.offset, q.offset + q.limit);

    return { items, total, limit: q.limit, offset: q.offset };
  }

  findPending(): Page<Order> {
    const rows = this.repo.all().filter((o) => o.status === "PENDING");
    return { items: rows, total: rows.length, limit: rows.length, offset: 0 };
  }

  findByRestaurant(restaurantId: number): Page<Order> {
    const rows = this.repo.all().filter((o) => o.restaurantId === restaurantId);
    return { items: rows, total: rows.length, limit: rows.length, offset: 0 };
  }

  findOne(id: number): Order {
    const order = this.repo.byId(id);
    if (!order) {
      throw new OrderNotFoundError(id);
    }
    return order;
  }

  updateStatus(id: number, status: OrderStatus): Order {
    const order = this.findOne(id);
    const updated = { ...order, status };
    return this.repo.save(updated);
  }

  cancel(id: number): void {
    this.findOne(id); // Validate exists
    this.repo.delete(id);
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 4000,
      Kazanchis: 6000,
      Piassa: 6000,
      Megenagna: 6000,
    };
  }

  create(orderData: Omit<Order, "id" | "status">): Order {
    const order: Order = {
      ...orderData,
      id: 0, // Will be assigned by repository
      status: "PENDING",
    };
    return this.repo.save(order);
  }
}
