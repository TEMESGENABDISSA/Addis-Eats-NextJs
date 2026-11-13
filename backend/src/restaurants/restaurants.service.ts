import { Injectable, Inject } from "@nestjs/common";
import { Restaurant, Area } from "./restaurant.types";
import { RestaurantNotFoundError } from "./restaurants.errors";
import { RestaurantRepository, RESTAURANT_REPOSITORY } from "./restaurants.repository";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY) private readonly repo: RestaurantRepository,
  ) {}

  findAll(area?: Area): Restaurant[] {
    const rows = this.repo.all();
    return area ? rows.filter((r) => r.area === area) : rows;
  }

  findOpen(): Restaurant[] {
    return this.repo.all().filter((r) => r.isOpen);
  }

  findOne(id: number): Restaurant {
    const hit = this.repo.byId(id);
    if (!hit) {
      throw new RestaurantNotFoundError(id);
    }
    return hit;
  }

  create(dto: CreateRestaurantDto): Restaurant {
    const id = Math.max(0, ...this.repo.all().map((r) => r.id)) + 1;
    const restaurant: Restaurant = {
      ...dto,
      id,
      isOpen: dto.isOpen ?? true,
    };
    return this.repo.save(restaurant);
  }
}
