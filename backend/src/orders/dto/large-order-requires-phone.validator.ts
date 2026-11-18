import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from "class-validator";
import { CreateOrderDto } from "./create-order.dto";

@ValidatorConstraint({ name: "largeOrderRequiresPhone", async: false })
export class LargeOrderRequiresPhoneConstraint
  implements ValidatorConstraintInterface
{
  validate(telebirrPhone: unknown, args: ValidationArguments) {
    const dto = args.object as CreateOrderDto;
    // If order has more than 5 items, phone is required
    if (dto.lines && dto.lines.length > 5) {
      return typeof telebirrPhone === "string" && telebirrPhone.length > 0;
    }
    return true;
  }

  defaultMessage() {
    return "telebirrPhone is required for orders with more than 5 items";
  }
}

export function LargeOrderRequiresPhone() {
  return Validate(LargeOrderRequiresPhoneConstraint);
}
