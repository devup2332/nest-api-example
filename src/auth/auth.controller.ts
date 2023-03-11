import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dco/create-user.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private _authSrv: AuthService) {}

  @Post()
  async createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this._authSrv.createUser(newUser);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this._authSrv.getAllUsers();
  }
  @Get(':userId')
  async getUserByPk(@Param() params): Promise<User> {
    const { userId } = params;
    return this._authSrv.getOneUserByPk(userId);
  }
}
