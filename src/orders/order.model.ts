import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Menu } from '../menu/menu.model';
import { OrderMenu } from './order-menu.model';

@Table({ tableName: 'order' })
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @Column({
    type: DataType.STRING,
  })
  status: string;

  @Column({
    type: DataType.FLOAT,
  })
  total_price: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isEdit: boolean;

  @BelongsToMany(() => Menu, () => OrderMenu)
  items: Menu[];
}
