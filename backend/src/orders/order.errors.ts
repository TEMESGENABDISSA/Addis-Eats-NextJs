// Domain errors for the orders module

export class OrderNotFoundError extends Error {
  constructor(public readonly orderId: number) {
    super(`Order ${orderId} not found`);
    this.name = "OrderNotFoundError";
  }
}

export class InvalidTransitionError extends Error {
  constructor(
    public readonly currentStatus: string,
    public readonly targetStatus: string,
  ) {
    super(
      `Cannot transition order from ${currentStatus} to ${targetStatus}`,
    );
    this.name = "InvalidTransitionError";
  }
}

export class PaymentDeclinedError extends Error {
  constructor(
    public readonly phone: string,
    public readonly reason: string,
  ) {
    super(`TeleBirr declined ${phone}: ${reason}`);
    this.name = "PaymentDeclinedError";
  }
}
