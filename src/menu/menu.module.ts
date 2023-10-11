import { forwardRef, Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu } from './menu.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [
    SequelizeModule.forFeature([Menu, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
})
export class MenuModule {}
