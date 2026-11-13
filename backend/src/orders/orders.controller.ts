import { Controller, Get, Post, Param, Query, Body, HttpCode } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Query("area") area?: string) {
    return this.ordersService.findAll(area);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(Number(id));
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
