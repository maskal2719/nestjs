import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Menu } from '../menu/menu.model';

interface CategoryCreationAttrs {
  categoryName: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  categoryName: string;

  @HasMany(() => Menu)
  menuItems: Menu[];
}
