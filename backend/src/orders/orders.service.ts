import { Injectable, Inject } from "@nestjs/common";
import { Order, Area, OrderStatus } from "./order.types";
import { OrderNotFoundError, InvalidTransitionError } from "./order.errors";
import { OrderRepository, ORDER_REPOSITORY } from "./order.repository";
import { FindOrdersQuery } from "./dto/find-orders.query";
import { Page } from "../common/page";

// Status transition table - defines allowed state changes
const ALLOWED_TRANSITIONS: Record<
  OrderStatus,
  readonly OrderStatus[]
> = {
  PENDING: ["PREPARING", "CANCELLED"],
  PREPARING: ["ON_THE_WAY", "CANCELLED"],
  ON_THE_WAY: ["DELIVERED"],
  DELIVERED: [], // terminal
  CANCELLED: [], // terminal
};

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

    // Sort (copy first to avoid mutation, handle descending with leading minus)
    const sortField = q.sort.startsWith("-") ? q.sort.slice(1) : q.sort;
    const descending = q.sort.startsWith("-");
    rows = [...rows].sort((a, b) => {
      const comparison = a[sortField].localeCompare(b[sortField]);
      return descending ? -comparison : comparison;
    });

    // Page
    const total = rows.length;
    const items = rows.slice(q.offset, q.offset + q.limit);

    return { items, total, limit: q.limit, offset: q.offset };
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
    const order = this.findOne(id); // throws 404 if not found

    // Check if transition is allowed
    const allowed = ALLOWED_TRANSITIONS[order.status];
    if (!allowed.includes(status)) {
      throw new InvalidTransitionError(order.status, status);
    }

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
