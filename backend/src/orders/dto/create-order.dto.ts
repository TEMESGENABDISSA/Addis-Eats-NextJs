import {
  IsString,
  IsInt,
  Min,
  IsIn,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { Area } from "../order.types";
import { OrderLineDto } from "./order-line.dto";
import { IsTeleBirrNumber } from "../../common/validators/is-telebirr-number.validator";
import { IsSantim } from "../../common/validators/is-santim.validator";
import { LargeOrderRequiresPhone } from "./large-order-requires-phone.validator";

export class CreateOrderDto {
  @IsString()
  @Min(2)
  customerName!: string;

  @IsIn(["Bole", "Kazanchis", "Piassa", "Megenagna"])
  area!: Area;

  @IsInt()
  @Min(1)
  restaurantId!: number;

  @IsSantim()
  totalSantim!: number;

  @IsOptional()
  @IsTeleBirrNumber()
  @LargeOrderRequiresPhone()
  telebirrPhone?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines!: OrderLineDto[];
}
