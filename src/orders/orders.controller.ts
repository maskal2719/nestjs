
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from "@nestjs/common";

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  create(@Body() orderDto: any) {
    return this.orderService.createOrder(orderDto);
  }

  @Get()
  getAll(@Query() sort) {
    return this.orderService.getOrders(sort);
  }

  @Put(':id')
  update(@Body() updateOrderDto: any, @Param('id') id: number) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
