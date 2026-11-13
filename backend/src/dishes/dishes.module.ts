import { Module } from "@nestjs/common";
import { DishesController } from "./dishes.controller";
import { DishesService } from "./dishes.service";
import { InMemoryDishRepository, DISH_REPOSITORY } from "./dishes.repository";
import { InMemoryRestaurantRepository, RESTAURANT_REPOSITORY } from "../restaurants/restaurants.repository";

@Module({
  controllers: [DishesController],
  providers: [
    DishesService,
    {
      provide: DISH_REPOSITORY,
      useClass: InMemoryDishRepository,
    },
    {
      provide: RESTAURANT_REPOSITORY,
      useClass: InMemoryRestaurantRepository,
    },
  ],
})
export class DishesModule {}
