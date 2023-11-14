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
      const price = menu?.price;
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

  async getOrders(sort: { date?: 'asc' | 'desc', price?: 'asc' | 'desc' }) {
    try {
      const orderOptions: any = [['createdAt', 'DESC']]; // Массив опций сортировки по умолчанию

      if (sort.date === 'asc') {
        orderOptions[0][1] = 'ASC'; // Изменяем порядок сортировки для даты на возрастание
      }

      if (sort.price === 'asc') {
        orderOptions.unshift(['total_price', 'ASC']); // Добавляем сортировку по цене в порядке возрастания на первое место
      } else if (sort.price === 'desc') {
        orderOptions.unshift(['total_price', 'DESC']); // Добавляем сортировку по цене в порядке убывания на первое место
      }

      const orders = await this.orderRepository.findAll({
        include: [
          {
            model: Menu,
            through: {
              attributes: ['count'],
            },
          },
        ],
        order: orderOptions, // Передаем опции сортировки
      });

      return orders.map((order) => {
        const { items, ...orderData } = order.toJSON();
        const processedItems = items.map(({ OrderMenu, ...item }: any) => ({
          ...item,
          count: OrderMenu?.count,
        }));

        return { ...orderData, items: processedItems };
      });
    } catch (err) {
      throw new Error('Не удалось получить информацию о заказах');
    }
  }

  async updateOrder(id: number, dto: any) {
    const order = await this.orderRepository.findByPk(id, {
      include: [
        {
          model: Menu,
          through: {
            attributes: ['count'],
          },
        },
      ],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await OrderMenu.destroy({ where: { order_id: order.id } });

    let totalPrice = 0;

    for (const item of dto.items) {
      const menu = await Menu.findByPk(item.id);
      const price = menu?.price;
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

    await order.update(
        {
          ...dto, // Обновляем данные заказа с использованием dto
          isEdit: true,
        },
        { fields: ['comment', 'status', 'isEdit'] } // Указываем только изменяемые поля
    );

    const updatedItems = await OrderMenu.findAll({ where: { order_id: order.id } });
    const processedItems = updatedItems.map((item: any) => ({
      id: item.menu_id,
      count: item.count,
    }));


    return { ...order.toJSON(), items: processedItems };
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepository.findByPk(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await OrderMenu.destroy({ where: { order_id: order.id } });
    await order.destroy();

    return order;
  }
}
