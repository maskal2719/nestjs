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
  create(@Body() categoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(categoryDto);
  }

  @Get()
  getAll() {
    return this.categoriesService.getAllCategory();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.categoriesService.getOneCategory(id);
  }

  @Put(':id')
  update(
    @Body() updateCategoryDto: CreateCategoryDto,
    @Param('id') id: number,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
