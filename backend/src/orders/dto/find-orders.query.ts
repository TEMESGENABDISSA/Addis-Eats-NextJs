import { IsOptional, IsIn, IsInt, Min, Max, Matches } from "class-validator";
import { Type } from "class-transformer";
import { Area } from "../order.types";
import { OrderStatus } from "../order.types";

export class FindOrdersQuery {
  @IsOptional()
  @IsIn(["PENDING", "PREPARING", "ON_THE_WAY", "DELIVERED", "CANCELLED"])
  status?: OrderStatus;

  @IsOptional()
  @IsIn(["Bole", "Kazanchis", "Piassa", "Megenagna"])
  area?: Area;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;

  @IsOptional()
  @Matches(/^(-)?(customerName|status|area)$/)
  sort: string = "customerName";
}
