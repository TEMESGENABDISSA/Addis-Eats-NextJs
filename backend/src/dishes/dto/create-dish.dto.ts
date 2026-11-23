import { IsString, IsInt, Min } from "class-validator";

export class CreateDishDto {
  /** Name of the dish. */
  @IsString()
  name!: string;

  /** Price in whole santim. 24000 is 240.00 ETB. */
  @IsInt()
  @Min(1)
  priceSantim!: number;

  /** ID of the restaurant this dish belongs to. */
  @IsInt()
  @Min(1)
  restaurantId!: number;
}
