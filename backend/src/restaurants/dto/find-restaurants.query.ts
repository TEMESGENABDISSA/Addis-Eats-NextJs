import { IsOptional, IsIn, IsBoolean, IsInt, Min, Max, Matches } from "class-validator";
import { Type } from "class-transformer";
import { AREAS, Area } from "../restaurant.types";

export class FindRestaurantsQuery {
  @IsOptional()
  @IsIn(AREAS)
  area?: Area;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isOpen?: boolean;

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
  @Matches(/^(-)?(name|area)$/)
  sort: string = "name";
}
