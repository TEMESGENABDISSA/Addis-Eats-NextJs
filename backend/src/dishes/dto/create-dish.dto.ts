import { IsString, IsInt, Min } from "class-validator";

export class CreateDishDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(1)
  priceSantim!: number;

  @IsInt()
  @Min(1)
  restaurantId!: number;
}
