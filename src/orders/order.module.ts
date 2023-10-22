import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Menu } from '../menu/menu.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Order } from './order.model';
import { OrderMenu } from './order-menu.model';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Menu, Role, UserRoles, Order, OrderMenu]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
})
export class OrderModule {}
