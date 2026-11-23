import { Injectable, CanActivate, ExecutionContext, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { OrdersService } from "../../orders/orders.service";
import { OrderPolicy, AuthUser, OrderAction } from "../policies/order.policy";
import { POLICY_KEY } from "../decorators/check-policy.decorator";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class OrderPolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly orders: OrdersService,
    private readonly policy: OrderPolicy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Skip if endpoint is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const action = this.reflector.get<OrderAction>(POLICY_KEY, context.getHandler());
    if (!action) return true;

    const req = context.switchToHttp().getRequest();
    const user: AuthUser = req.user;
    const orderId = Number(req.params.id);

    const order = await this.orders.findOne(orderId);
    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    req.order = order; // Stash for the handler to avoid duplicate lookup

    if (!this.policy.can(user, action, order)) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    return true;
  }
}
