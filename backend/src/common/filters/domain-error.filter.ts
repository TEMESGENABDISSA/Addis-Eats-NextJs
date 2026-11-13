import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { OrderNotFoundError } from "../../orders/order.errors";
import { RestaurantNotFoundError } from "../../restaurants/restaurants.errors";
import { DishNotFoundError, RestaurantNotFoundError as DishRestaurantNotFoundError } from "../../dishes/dishes.errors";

@Catch(
  OrderNotFoundError,
  RestaurantNotFoundError,
  DishNotFoundError,
  DishRestaurantNotFoundError,
)
export class DomainErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = HttpStatus.NOT_FOUND;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
