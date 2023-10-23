import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  create(@Body() orderDto: any) {
    return this.orderService.createOrder(orderDto);
  }

  @Get()
  getAll() {
    return this.orderService.getOrders();
  }
}
