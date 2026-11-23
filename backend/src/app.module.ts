import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from "@nestjs/core";
import { LoggerModule } from "nestjs-pino";
import { OrdersModule } from "./orders/orders.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { DishesModule } from "./dishes/dishes.module";
import { AuthModule } from "./auth/auth.module";
import { RequestIdMiddleware } from "./common/middleware/request-id.middleware";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { RolesGuard } from "./common/guards/roles.guard";
import { OrderPolicyGuard } from "./common/guards/order-policy.guard";
import { OrderPolicy } from "./common/policies/order.policy";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? "info",
        genReqId: (req) => req.headers["x-request-id"] as string,
        redact: {
          paths: [
            "req.headers.authorization",
            "req.headers['x-api-key']",
            "req.body.password",
            "*.phone",
            "*.accessToken",
            "*.refreshToken",
          ],
          censor: "[redacted]",
        },
        transport: process.env.NODE_ENV === "development"
          ? { target: "pino-pretty" }
          : undefined,
      },
    }),
    AuthModule,
    OrdersModule,
    RestaurantsModule,
    DishesModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: OrderPolicyGuard },
    OrderPolicy,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes("*");
  }
}
