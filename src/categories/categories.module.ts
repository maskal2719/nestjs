import { forwardRef, Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Category } from './categories.model';
import { MenuService } from '../menu/menu.service';
import { Menu } from '../menu/menu.model';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, MenuService],
  imports: [
    SequelizeModule.forFeature([Category, Role, UserRoles, Menu]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
