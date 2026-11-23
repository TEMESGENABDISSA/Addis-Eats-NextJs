import { IsInt, IsPositive, Max } from "class-validator";

export class OrderLineDto {
  /** ID of the dish to order. */
  @IsInt()
  @IsPositive()
  dishId!: number;

  /** Quantity of this dish. Maximum 20 per line. */
  @IsInt()
  @IsPositive()
  @Max(20)
  quantity!: number;
}
