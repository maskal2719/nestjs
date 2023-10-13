import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

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
}
