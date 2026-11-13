import { Injectable, Inject } from "@nestjs/common";
import { Order, Area } from "./order.types";
import { OrderNotFoundError } from "./order.errors";
import { OrderRepository, ORDER_REPOSITORY } from "./order.repository";

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly repo: OrderRepository,
  ) {}

  findAll(area?: string): Order[] {
    const orders = this.repo.all();
    if (area) {
      return orders.filter((order) => order.area === area);
    }
    return orders;
  }

  findOne(id: number): Order {
    const order = this.repo.byId(id);
    if (!order) {
      throw new OrderNotFoundError(id);
    }
    return order;
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
