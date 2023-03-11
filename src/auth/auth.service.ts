import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dco/create-user.dto';
import { v4 as uuid } from 'uuid';
import { environments } from 'src/environments';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private _userRep: Repository<User>) {}

  async createUser(user: CreateUserDto) {
    try {
      console.log({ environments });
      const newUser = this._userRep.create(user);
      newUser.id = uuid();
      console.log({ newUser });
      return await this._userRep.save(newUser);
    } catch (err) {
      return err;
    }
  }

  async getAllUsers() {
    try {
      return await this._userRep.find();
    } catch (err) {
      return err;
    }
  }

  async getOneUserByPk(id: string) {
    return this._userRep.findOne({
      where: {
        id,
      },
    });
  }
}
