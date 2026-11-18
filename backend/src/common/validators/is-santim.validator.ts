import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from "class-validator";

@ValidatorConstraint({ name: "isSantim", async: false })
export class IsSantimConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return (
      Number.isInteger(value) &&
      (value as number) > 0 &&
      (value as number) <= 10_000_000
    ); // 100,000 ETB ceiling
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a whole number of santim, between 1 and 10,000,000 (100,000 ETB)`;
  }
}

export function IsSantim() {
  return Validate(IsSantimConstraint);
}
