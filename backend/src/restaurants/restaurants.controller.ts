import { Controller, Get, Post, Param, Query, Body, HttpCode, Header, Res } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { RestaurantsService } from "./restaurants.service";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { FindRestaurantsQuery } from "./dto/find-restaurants.query";
import { DishesService } from "../dishes/dishes.service";
import { OrdersService } from "../orders/orders.service";

@ApiTags("restaurants")
@Controller("restaurants")
export class RestaurantsController {
  constructor(
    private readonly restaurants: RestaurantsService,
    private readonly dishes: DishesService,
    private readonly orders: OrdersService,
  ) {}

  @Get()
  @ApiOperation({ summary: "List restaurants with filtering, sorting, and pagination" })
  @ApiResponse({ status: 200, description: "Returns paginated list of restaurants" })
  findAll(@Query() query: FindRestaurantsQuery) {
    return this.restaurants.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a restaurant by ID" })
  @ApiResponse({ status: 200, description: "Restaurant found" })
  @ApiResponse({ status: 404, description: "Restaurant not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.restaurants.findOne(id);
  }

  @Get(":id/dishes")
  @ApiOperation({ summary: "Get dishes for a specific restaurant" })
  @ApiResponse({ status: 200, description: "Returns dishes for the restaurant" })
  @ApiResponse({ status: 404, description: "Restaurant not found" })
  findDishes(@Param("id", ParseIntPipe) id: number) {
    this.restaurants.findOne(id); // Validate parent exists
    return this.dishes.findByRestaurant(id);
  }

  @Get(":id/orders")
  @ApiOperation({ summary: "Get orders for a specific restaurant" })
  @ApiResponse({ status: 200, description: "Returns orders for the restaurant" })
  @ApiResponse({ status: 404, description: "Restaurant not found" })
  findOrders(@Param("id", ParseIntPipe) id: number) {
    this.restaurants.findOne(id); // Validate parent exists
    return this.orders.findByRestaurant(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new restaurant" })
  @ApiResponse({ status: 201, description: "Restaurant created successfully" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  @HttpCode(201)
  @Header("Cache-Control", "no-store")
  create(@Body() dto: CreateRestaurantDto, @Res({ passthrough: true }) res: Response) {
    const restaurant = this.restaurants.create(dto);
    res.header("Location", `/api/v1/restaurants/${restaurant.id}`);
    return restaurant;
  }
}
