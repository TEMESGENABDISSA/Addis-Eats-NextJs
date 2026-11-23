import { Controller, Get, Post, Patch, Delete, Param, Query, Body, HttpCode, HttpStatus, Header, Res } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { FindOrdersQuery } from "./dto/find-orders.query";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: "List orders with filtering, sorting, and pagination" })
  @ApiResponse({ status: 200, description: "Returns paginated list of orders" })
  findAll(@Query() query: FindOrdersQuery) {
    return this.ordersService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an order by ID" })
  @ApiResponse({ status: 200, description: "Order found" })
  @ApiResponse({ status: 404, description: "Order not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Update order status" })
  @ApiResponse({ status: 200, description: "Status updated successfully" })
  @ApiResponse({ status: 404, description: "Order not found" })
  @ApiResponse({ status: 409, description: "Invalid status transition" })
  updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.ordersService.updateStatus(id, dto.status);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Cancel an order (staff only)" })
  @ApiResponse({ status: 204, description: "Order cancelled successfully" })
  @ApiResponse({ status: 404, description: "Order not found" })
  @ApiResponse({ status: 403, description: "Insufficient permissions" })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles("staff")
  cancel(@Param("id", ParseIntPipe) id: number): void {
    this.ordersService.cancel(id);
  }

  @Post()
  @ApiOperation({ summary: "Place a new order" })
  @ApiResponse({ status: 201, description: "Order created successfully" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  @HttpCode(201)
  @Header("Cache-Control", "no-store")
  create(@Body() dto: CreateOrderDto, @Res({ passthrough: true }) res: Response) {
    const order = this.ordersService.create(dto);
    res.header("Location", `/api/v1/orders/${order.id}`);
    return order;
  }
}
