import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Request, Response } from "express";
import { OrderNotFoundError } from "../../orders/order.errors";
import { InvalidTransitionError } from "../../orders/order.errors";
import { RestaurantNotFoundError } from "../../restaurants/restaurants.errors";
import { DishNotFoundError } from "../../dishes/dishes.errors";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@InjectPinoLogger() private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const { status, message } = this.translate(exception);

    // Log server errors (5xx) only
    if (status >= 500) {
      this.logger.error(exception, "Unhandled exception");
    }

    res.status(status).json({
      statusCode: status,
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
      requestId: req.headers["x-request-id"] ?? null,
    });
  }

  private translate(e: unknown): { status: number; message: unknown } {
    // 1 - Nest's own exceptions already carry a status
    if (e instanceof HttpException) {
      const body = e.getResponse();
      return {
        status: e.getStatus(),
        message:
          typeof body === "object" && "message" in body
            ? (body as { message: unknown }).message
            : e.message,
      };
    }

    // 2 - your domain errors
    if (e instanceof OrderNotFoundError) {
      return { status: 404, message: e.message };
    }
    if (e instanceof RestaurantNotFoundError) {
      return { status: 404, message: e.message };
    }
    if (e instanceof DishNotFoundError) {
      return { status: 404, message: e.message };
    }
    if (e instanceof InvalidTransitionError) {
      return { status: 409, message: e.message };
    }

    // 3 - anything else is yours, and the client learns nothing
    return { status: 500, message: "Internal server error" };
  }
}
