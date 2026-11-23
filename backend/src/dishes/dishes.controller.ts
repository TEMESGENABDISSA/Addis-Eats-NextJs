import { Controller, Get, Post, Param, Query, Body, HttpCode, Header, Res } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { DishesService } from "./dishes.service";
import { CreateDishDto } from "./dto/create-dish.dto";

@ApiTags("dishes")
@Controller("dishes")
export class DishesController {
  constructor(private readonly dishes: DishesService) {}

  @Get()
  @ApiOperation({ summary: "List dishes, optionally filtered by restaurant" })
  @ApiResponse({ status: 200, description: "Returns paginated list of dishes" })
  findAll(@Query("restaurantId", ParseIntPipe) restaurantId?: number) {
    return this.dishes.findAll(restaurantId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a dish by ID" })
  @ApiResponse({ status: 200, description: "Dish found" })
  @ApiResponse({ status: 404, description: "Dish not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.dishes.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new dish" })
  @ApiResponse({ status: 201, description: "Dish created successfully" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  @ApiResponse({ status: 404, description: "Restaurant not found" })
  @HttpCode(201)
  @Header("Cache-Control", "no-store")
  create(@Body() dto: CreateDishDto, @Res({ passthrough: true }) res: Response) {
    const dish = this.dishes.create(dto);
    res.header("Location", `/api/v1/dishes/${dish.id}`);
    return dish;
  }
}
