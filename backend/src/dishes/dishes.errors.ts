export class DishNotFoundError extends Error {
  constructor(public readonly id: number) {
    super(`Dish ${id} not found`);
    this.name = "DishNotFoundError";
  }
}

export class RestaurantNotFoundError extends Error {
  constructor(public readonly id: number) {
    super(`Restaurant ${id} not found`);
    this.name = "RestaurantNotFoundError";
  }
}
