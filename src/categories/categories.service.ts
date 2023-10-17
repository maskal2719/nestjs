import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    private menuService: MenuService,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const existingCategory = await this.getCategoryByName(dto.categoryName);

    if (existingCategory) {
      throw new ConflictException('The category already exists');
    }

    const category = await this.categoryRepository.create(dto);
    return category;
  }

  async getAllCategory() {
    const categories = await this.categoryRepository.findAll({
      include: { all: true },
    });

    return categories;
  }

  async getOneCategory(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async updateCategory(id: number, dto: CreateCategoryDto) {
    const category = await this.categoryRepository.findByPk(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await category.update(dto);
    return category;
  }

  async getCategoryByName(categoryName: string) {
    const category = await this.categoryRepository.findOne({
      where: { categoryName },
    });
    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findByPk(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.menuService.deleteAllMenuItemsForCategoryId(id);
    await category.destroy({ force: true });
    return category.categoryName;
  }
}
