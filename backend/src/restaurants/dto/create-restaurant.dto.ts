import { IsString, IsIn, IsBoolean, IsOptional, Length } from "class-validator";
import { AREAS } from "../restaurant.types";

export class CreateRestaurantDto {
  @IsString()
  @Length(2, 80)
  name!: string;

  @IsIn(AREAS)
  area!: (typeof AREAS)[number];

  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;
}
