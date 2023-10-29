import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Category } from '../categories/categories.model';

interface MenuModelAttrs {
  name: string;
  price: number;
  weight: number;
  description: string;
  isEmpty: boolean;
  isDeleted: boolean;
}

@Table({ tableName: 'menu' })
export class Menu extends Model<Menu, MenuModelAttrs> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  name: string;
  @Column({ type: DataTypes.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataTypes.FLOAT, allowNull: true })
  weight: number;

  @Column({ type: DataTypes.STRING, allowNull: true })
  description: string;

  @Column({ type: DataTypes.BOOLEAN, allowNull: true })
  isEmpty?: boolean;

  @Column({ type: DataTypes.BOOLEAN, allowNull: true })
  isDeleted?: boolean;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
