import { Injectable } from '@nestjs/common';
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
    });

    for (const item of dto.items) {
      const menu = await Menu.findByPk(item.id);
      const price = menu.price;
      if (menu) {
        await OrderMenu.create({
          order_id: order.id,
          menu_id: item.id,
          count: item.count,
          price: price * item.count,
        });
      }
    }

    return order;
  }

  // async getOrder(orderId: number) {
  //   try {
  //     const order = await this.orderRepository.findByPk(orderId, {
  //       include: [{ model: Menu }],
  //     });
  //
  //     return order;
  //   } catch (err) {
  //     throw new Error('Не удалось получить информацию о заказе');
  //   }
  // }
}
