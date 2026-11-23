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
  /** Customer's full name as they provided it. */
  @IsString()
  @Min(2)
  customerName!: string;

  /** One of the four Addis Ababa delivery areas: Bole, Kazanchis, Piassa, or Megenagna. */
  @IsIn(["Bole", "Kazanchis", "Piassa", "Megenagna"])
  area!: Area;

  /** ID of the restaurant to order from. */
  @IsInt()
  @Min(1)
  restaurantId!: number;

  /** Total amount in whole santim. 24000 is 240.00 ETB. Computed from lines; ignored if sent. */
  @IsSantim()
  totalSantim!: number;

  /**
   * TeleBirr phone number in format 09xxxxxxxx or +2519xxxxxxxx.
   * Optional until payment is required.
   * @example "0912345678"
   */
  @IsOptional()
  @IsTeleBirrNumber()
  @LargeOrderRequiresPhone()
  telebirrPhone?: string;

  /** Array of order lines with dish IDs and quantities. Minimum 1 item required. */
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines!: OrderLineDto[];
}
