import { Module } from "@nestjs/common";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";
import { InMemoryRestaurantRepository, RESTAURANT_REPOSITORY } from "./restaurants.repository";
import { DishesModule } from "../dishes/dishes.module";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [DishesModule, OrdersModule],
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    {
      provide: RESTAURANT_REPOSITORY,
      useClass: InMemoryRestaurantRepository,
    },
  ],
})
export class RestaurantsModule {}
