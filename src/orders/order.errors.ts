// Day 53 - In-Class Exercise: Domain Errors

// Domain error for when an order cannot be found
export class OrderNotFoundError extends Error {
  constructor(public readonly orderId: number) {
    super(`Order ${orderId} not found`);
    this.name = "OrderNotFoundError";
  }
}

// Domain error for when a payment is declined
export class PaymentDeclinedError extends Error {
  constructor(
    public readonly phone: string,
    public readonly reason: string,
  ) {
    super(`TeleBirr declined ${phone}: ${reason}`);
    this.name = "PaymentDeclinedError";
  }
}
