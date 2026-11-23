import { SetMetadata } from "@nestjs/common";
import { OrderAction } from "../policies/order.policy";

export const POLICY_KEY = "policy";
export const CheckPolicy = (action: OrderAction) => SetMetadata(POLICY_KEY, action);
