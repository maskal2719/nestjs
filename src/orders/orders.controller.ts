import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  create(@Body() orderDto: any) {
    return this.orderService.createOrder(orderDto);
  }

  @Get(':id')
  getOrder(@Param('id') id: number) {
    return this.orderService.getOrder(id);
  }
}
