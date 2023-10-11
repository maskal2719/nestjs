import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

interface MenuModelAttrs {
  name: string;
  price: number;
  isEmpty: boolean;
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

  @Column({ type: DataTypes.BOOLEAN, allowNull: true })
  isEmpty?: boolean;
}
