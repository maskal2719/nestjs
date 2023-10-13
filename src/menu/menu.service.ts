import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Menu } from './menu.model';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { Category } from '../categories/categories.model';

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu) private menuRepository: typeof Menu) {}

  async createMenuItem(dto: CreateMenuItemDto) {
    const existingMenuItem = await this.getMenuItemByName(dto.name);

    if (existingMenuItem) {
      throw new ConflictException('The menu item already exists');
    }
    const menuItem = await this.menuRepository.create({
      ...dto,
      isEmpty: false,
    });
    return menuItem;
  }

  async updateMenuItem(id: number, dto: CreateMenuItemDto) {
    const menuItem = await this.menuRepository.findByPk(id);

    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }

    await menuItem.update(dto);
    return menuItem;
  }

  async getAllMenuItems() {
    const menuItems = await this.menuRepository.findAll({
      where: {
        isEmpty: false,
      },
      include: [
        {
          model: Category,
        },
      ],
    });
    return menuItems;
  }

  async getMenuItemByName(name: string) {
    const menuItem = await this.menuRepository.findOne({ where: { name } });
    return menuItem;
  }
}
