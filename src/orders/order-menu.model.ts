import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Order } from './order.model';
import { Menu } from '../menu/menu.model';

@Table({
  tableName: 'order_menu',
  indexes: [
    {
      name: 'UniqueOrderMenu',
      unique: true,
      fields: ['menu_id', 'order_id'],
    },
  ],
  createdAt: false,
  updatedAt: false,
})
export class OrderMenu extends Model<OrderMenu> {
  @Column({
    type: DataTypes.INTEGER,
  })
  @ForeignKey(() => Order)
  order_id: number;

  @Column({
    type: DataTypes.INTEGER,
  })
  @ForeignKey(() => Menu)
  menu_id: number;

  @Column({
    type: DataTypes.INTEGER,
  })
  count: number;

  @Column({
    type: DataTypes.FLOAT,
  })
  price: number;
}
