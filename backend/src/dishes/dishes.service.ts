import { Injectable, Inject } from "@nestjs/common";
import { Dish } from "./dish.types";
import { DishNotFoundError, RestaurantNotFoundError } from "./dishes.errors";
import { DishRepository, DISH_REPOSITORY } from "./dishes.repository";
import { RestaurantRepository, RESTAURANT_REPOSITORY } from "../restaurants/restaurants.repository";
import { CreateDishDto } from "./dto/create-dish.dto";
import { Page } from "../common/page";

@Injectable()
export class DishesService {
  constructor(
    @Inject(DISH_REPOSITORY) private readonly dishRepo: DishRepository,
    @Inject(RESTAURANT_REPOSITORY) private readonly restaurantRepo: RestaurantRepository,
  ) {}

  findAll(restaurantId?: number): Page<Dish> {
    let dishes = this.dishRepo.all();
    if (restaurantId) {
      dishes = dishes.filter((d) => d.restaurantId === restaurantId);
    }
    return { items: dishes, total: dishes.length, limit: dishes.length, offset: 0 };
  }

  findByRestaurant(restaurantId: number): Page<Dish> {
    const dishes = this.dishRepo.all().filter((d) => d.restaurantId === restaurantId);
    return { items: dishes, total: dishes.length, limit: dishes.length, offset: 0 };
  }

  findOne(id: number): Dish {
    const hit = this.dishRepo.byId(id);
    if (!hit) {
      throw new DishNotFoundError(id);
    }
    return hit;
  }

  create(dto: CreateDishDto): Dish {
    // Validate restaurant exists
    const restaurant = this.restaurantRepo.byId(dto.restaurantId);
    if (!restaurant) {
      throw new RestaurantNotFoundError(dto.restaurantId);
    }

    const id = Math.max(0, ...this.dishRepo.all().map((d) => d.id)) + 1;
    const dish: Dish = {
      ...dto,
      id,
    };
    return this.dishRepo.save(dish);
  }
}
