import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  create(@Body() categoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(categoryDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  getAll() {
    return this.categoriesService.getAllCategory();
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  update(
    @Body() updateCategoryDto: CreateCategoryDto,
    @Param('id') id: number,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
