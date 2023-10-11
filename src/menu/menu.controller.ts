import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  create(@Body() menuItemDto: CreateMenuItemDto) {
    return this.menuService.createMenuItem(menuItemDto);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  update(
    @Body() updateMenuItemDto: CreateMenuItemDto,
    @Param('id') id: number,
  ) {
    return this.menuService.updateMenuItem(id, updateMenuItemDto);
  }

  @Get()
  getAll() {
    return this.menuService.getAllMenuItems();
  }
}
