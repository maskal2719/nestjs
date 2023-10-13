import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { Menu } from './menu/menu.model';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/categories.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      // ssl: true,
      // dialectOptions: {
      //   ssl: {
      //     require: true, // Требовать SSL
      //     rejectUnauthorized: false, // Отключить проверку подлинности сертификата
      //   },
      // },
      models: [User, Role, UserRoles, Menu, Category],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    MenuModule,
    CategoriesModule,
  ],
})
export class AppModule {}
