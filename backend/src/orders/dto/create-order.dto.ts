import { IsString, IsInt, Min, IsIn, Matches, IsOptional, IsArray } from "class-validator";
import { Area } from "../order.types";

export class CreateOrderDto {
  @IsString()
  customerName!: string;

  @IsIn(["Bole", "Kazanchis", "Piassa", "Megenagna"])
  area!: Area;

  @IsInt()
  @Min(1)
  restaurantId!: number;

  @IsInt()
  @Min(1)
  totalSantim!: number;

  @IsOptional()
  @Matches(/^(?:\+251|0)9\d{8}$/, {
    message: "phone must be a valid TeleBirr number",
  })
  telebirrPhone?: string;

  @IsArray()
  dishes!: Array<{ name: string; priceSantim: number }>;
}
