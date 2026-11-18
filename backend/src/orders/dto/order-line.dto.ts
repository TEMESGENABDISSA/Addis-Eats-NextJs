import { IsInt, IsPositive, Max } from "class-validator";

export class OrderLineDto {
  @IsInt()
  @IsPositive()
  dishId!: number;

  @IsInt()
  @IsPositive()
  @Max(20)
  quantity!: number;
}
