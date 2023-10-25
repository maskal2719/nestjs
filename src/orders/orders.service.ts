import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.model';
import { InjectModel } from '@nestjs/sequelize';
import { Menu } from '../menu/menu.model';
import { OrderMenu } from './order-menu.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

  async createOrder(dto: any) {
    const order = await Order.create({
      items: dto.items,
      comment: dto.comment,
      status: dto.status,
      name: Date.now().toString().slice(-6),
    });

    let totalPrice = 0; // Инициализация общей стоимости

    for (const item of dto.items) {
      const menu = await Menu.findByPk(item.id);
      const price = menu.price;
      const fullPrice = price * item.count;
      if (menu) {
        await OrderMenu.create({
          order_id: order.id,
          menu_id: item.id,
          count: item.count,
          price: fullPrice,
        });
        totalPrice += fullPrice;
      }
    }
    order.total_price = totalPrice;
    await order.save();
    return order;
  }

  async getOrders() {
    try {
      const orders = await this.orderRepository.findAll({
        include: [{ model: Menu }],
      });

      return orders;
    } catch (err) {
      throw new Error('Не удалось получить информацию о заказах');
    }
  }

  async updateOrder(id: number, dto: any) {
    const order = await this.orderRepository.findByPk(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await order.update(dto);
    return order;
  }
}
