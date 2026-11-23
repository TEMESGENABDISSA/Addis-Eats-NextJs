import { IsString, IsIn, IsBoolean, IsOptional, Length } from "class-validator";
import { AREAS } from "../restaurant.types";

export class CreateRestaurantDto {
  /** Name of the restaurant. */
  @IsString()
  @Length(2, 80)
  name!: string;

  /** One of the four Addis Ababa delivery areas. */
  @IsIn(AREAS)
  area!: (typeof AREAS)[number];

  /** Whether the restaurant is currently open for orders. */
  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;
}
