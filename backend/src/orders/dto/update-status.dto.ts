import { IsIn } from "class-validator";
import { OrderStatus } from "../order.types";

export class UpdateStatusDto {
  @IsIn(["PENDING", "PREPARING", "ON_THE_WAY", "DELIVERED", "CANCELLED"])
  status!: OrderStatus;
}
