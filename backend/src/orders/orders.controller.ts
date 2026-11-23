import { Controller, Get, Post, Patch, Delete, Param, Query, Body, HttpCode, HttpStatus, Header, Req, Res } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response, Request } from "express";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { FindOrdersQuery } from "./dto/find-orders.query";
import { Roles } from "../common/decorators/roles.decorator";
import { CheckPolicy } from "../common/decorators/check-policy.decorator";
import { Public } from "../common/decorators/public.decorator";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: "List orders with filtering, sorting, and pagination" })
  @ApiResponse({ status: 200, description: "Returns paginated list of orders" })
  findAll(@Query() query: FindOrdersQuery, @Req() req: Request) {
    const userId = (req as any).user?.id;
    const userRoles = (req as any).user?.roles;
    return this.ordersService.findAll(query, userId, userRoles);
  }

  @Get(":id")
  @CheckPolicy("read")
  @ApiOperation({ summary: "Get an order by ID" })
  @ApiResponse({ status: 200, description: "Order found" })
  @ApiResponse({ status: 404, description: "Order not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(":id/status")
  @Roles("courier", "staff")
  @CheckPolicy("updateStatus")
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
  @CheckPolicy("cancel")
  @ApiOperation({ summary: "Cancel an order" })
  @ApiResponse({ status: 204, description: "Order cancelled successfully" })
  @ApiResponse({ status: 404, description: "Order not found" })
  @HttpCode(HttpStatus.NO_CONTENT)
  cancel(@Param("id", ParseIntPipe) id: number): void {
    this.ordersService.cancel(id);
  }

  @Post()
  @ApiOperation({ summary: "Place a new order" })
  @ApiResponse({ status: 201, description: "Order created successfully" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  @HttpCode(201)
  @Header("Cache-Control", "no-store")
  create(@Body() dto: CreateOrderDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const userId = (req as any).user?.id;
    const order = this.ordersService.create({ ...dto, customerId: userId });
    res.header("Location", `/api/v1/orders/${order.id}`);
    return order;
  }
}
