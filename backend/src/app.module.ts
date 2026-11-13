import { Module } from "@nestjs/common";
import { OrdersModule } from "./orders/orders.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { DishesModule } from "./dishes/dishes.module";

@Module({
  imports: [OrdersModule, RestaurantsModule, DishesModule],
})
export class AppModule {}
