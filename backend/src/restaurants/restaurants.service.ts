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

    // Sort (copy first to avoid mutation, handle descending with leading minus)
    const sortField = q.sort.startsWith("-") ? q.sort.slice(1) : q.sort;
    const descending = q.sort.startsWith("-");
    rows = [...rows].sort((a, b) => {
      const comparison = a[sortField].localeCompare(b[sortField]);
      return descending ? -comparison : comparison;
    });

    // Page
    const total = rows.length;
    const items = rows.slice(q.offset, q.offset + q.limit);

    return { items, total, limit: q.limit, offset: q.offset };
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
