import { Controller, Get, Post, Patch, Delete, Param, Query, Body, HttpCode, HttpStatus, Header, Res } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { Response } from "express";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { FindOrdersQuery } from "./dto/find-orders.query";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@Query() query: FindOrdersQuery) {
    return this.ordersService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.ordersService.updateStatus(id, dto.status);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  cancel(@Param("id", ParseIntPipe) id: number): void {
    this.ordersService.cancel(id);
  }

  @Post()
  @HttpCode(201)
  @Header("Cache-Control", "no-store")
  create(@Body() dto: CreateOrderDto, @Res({ passthrough: true }) res: Response) {
    const order = this.ordersService.create(dto);
    res.header("Location", `/api/v1/orders/${order.id}`);
    return order;
  }
}
