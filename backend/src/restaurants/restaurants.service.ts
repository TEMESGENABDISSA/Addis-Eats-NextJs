import { Injectable, Inject } from "@nestjs/common";
import { Restaurant, Area } from "./restaurant.types";
import { RestaurantNotFoundError } from "./restaurants.errors";
import { RestaurantRepository, RESTAURANT_REPOSITORY } from "./restaurants.repository";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { FindRestaurantsQuery } from "./dto/find-restaurants.query";
import { Page } from "../common/page";

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY) private readonly repo: RestaurantRepository,
  ) {}

  findAll(q: FindRestaurantsQuery): Page<Restaurant> {
    let rows = this.repo.all();

    // Filter
    if (q.area) rows = rows.filter((r) => r.area === q.area);
    if (q.isOpen !== undefined) {
      rows = rows.filter((r) => r.isOpen === q.isOpen);
    }

    // Sort (copy first to avoid mutation)
    rows = [...rows].sort((a, b) =>
      a[q.sort].localeCompare(b[q.sort]),
    );

    // Page
    const total = rows.length;
    const items = rows.slice(q.offset, q.offset + q.limit);

    return { items, total, limit: q.limit, offset: q.offset };
  }

  findOpen(): Page<Restaurant> {
    const rows = this.repo.all().filter((r) => r.isOpen);
    return { items: rows, total: rows.length, limit: rows.length, offset: 0 };
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
