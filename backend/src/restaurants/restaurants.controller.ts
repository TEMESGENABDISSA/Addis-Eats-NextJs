import { Controller, Get, Post, Param, Query, Body, HttpCode } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { FindRestaurantsQuery } from "./dto/find-restaurants.query";
import { DishesService } from "../dishes/dishes.service";
import { OrdersService } from "../orders/orders.service";

@Controller("restaurants")
export class RestaurantsController {
  constructor(
    private readonly restaurants: RestaurantsService,
    private readonly dishes: DishesService,
    private readonly orders: OrdersService,
  ) {}

  @Get("open")
  findOpen() {
    return this.restaurants.findOpen();
  }

  @Get()
  findAll(@Query() query: FindRestaurantsQuery) {
    return this.restaurants.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.restaurants.findOne(id);
  }

  @Get(":id/dishes")
  findDishes(@Param("id", ParseIntPipe) id: number) {
    this.restaurants.findOne(id); // Validate parent exists
    return this.dishes.findByRestaurant(id);
  }

  @Get(":id/orders")
  findOrders(@Param("id", ParseIntPipe) id: number) {
    this.restaurants.findOne(id); // Validate parent exists
    return this.orders.findByRestaurant(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurants.create(dto);
  }
}
