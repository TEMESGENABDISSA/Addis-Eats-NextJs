import { Controller, Get, Post, Param, Query, Body, HttpCode, Header, Res } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { Response } from "express";
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
  @Header("Cache-Control", "no-store")
  create(@Body() dto: CreateDishDto, @Res({ passthrough: true }) res: Response) {
    const dish = this.dishes.create(dto);
    res.header("Location", `/api/v1/dishes/${dish.id}`);
    return dish;
  }
}
