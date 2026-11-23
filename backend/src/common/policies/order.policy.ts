import { Injectable } from "@nestjs/common";
import { Order } from "../../orders/order.types";
import { UserRole } from "../../users/user.types";

export type OrderAction = "read" | "cancel" | "updateStatus";

export interface AuthUser {
  id: number;
  email: string;
  roles: UserRole[];
}

@Injectable()
export class OrderPolicy {
  can(user: AuthUser, action: OrderAction, order: Order): boolean {
    // Staff bypass everything
    if (user.roles.includes("staff")) return true;

    switch (action) {
      case "read":
        // Customer can read their own orders
        // Courier can read orders assigned to them
        return order.customerId === user.id || order.courierId === user.id;

      case "cancel":
        // Customer can cancel their own orders, but only while PENDING
        return order.customerId === user.id && order.status === "PENDING";

      case "updateStatus":
        // Courier can update status of orders assigned to them
        // Only allowed in PREPARING or ON_THE_WAY states
        return (
          order.courierId === user.id &&
          ["PREPARING", "ON_THE_WAY"].includes(order.status)
        );

      default: {
        const unreachable: never = action;
        return unreachable;
      }
    }
  }
}
