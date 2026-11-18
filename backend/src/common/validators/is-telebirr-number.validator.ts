import { registerDecorator, ValidationOptions } from "class-validator";

export const TELEBIRR = /^(?:\+251|0)9\d{8}$/;

export function IsTeleBirrNumber(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isTeleBirrNumber",
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate: (value: unknown) =>
          typeof value === "string" && TELEBIRR.test(value),
        defaultMessage: () =>
          "phone must be a TeleBirr number: 09xxxxxxxx or +2519xxxxxxxx",
      },
    });
  };
}
