import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  me(@Request() req: any) {
    const user = req.user;
    return {
      isInitialized: true,
      role: user.roles[0].value,
    };
  }

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
