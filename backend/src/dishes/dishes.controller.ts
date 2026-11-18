import { Controller, Get, Post, Param, Query, Body, HttpCode } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { DishesService } from "./dishes.service";
import { CreateDishDto } from "./dto/create-dish.dto";

@Controller("dishes")
export class DishesController {
  constructor(private readonly dishes: DishesService) {}

  @Get()
  findAll(@Query("restaurantId", ParseIntPipe) restaurantId?: number) {
    return this.dishes.findAll(restaurantId);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.dishes.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateDishDto) {
    return this.dishes.create(dto);
  }
}
