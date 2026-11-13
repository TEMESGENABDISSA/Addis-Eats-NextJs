import { Controller, Get, Post, Param, Query, Body, HttpCode } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { Area } from "./restaurant.types";

@Controller("restaurants")
export class RestaurantsController {
  constructor(private readonly restaurants: RestaurantsService) {}

  @Get("open")
  findOpen() {
    return this.restaurants.findOpen();
  }

  @Get()
  findAll(@Query("area") area?: Area) {
    return this.restaurants.findAll(area);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.restaurants.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurants.create(dto);
  }
}
