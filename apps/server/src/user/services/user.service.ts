import { Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/User';
import { UserDetails } from '../../utils/types';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async createUser(details: UserDetails): Promise<User> {
    console.log('Creating user with details: ', details);
    const newUser = await this.userModel.create(details);
    console.log('User created: ', newUser);

    return newUser;
  }

  async findUser(discordId: string): Promise<User | undefined> {
    console.log('Finding user with id: ', discordId);
    const x = await this.userModel.findOne({ discordId });
    console.log('User: ', x);
    return x;
  }

  async updateUser(user: User, details: UserDetails): Promise<User> {
    console.log('Updating user: ', user);
    const updatedUser = await this.userModel.findOneAndUpdate(
      { discordId: user.discordId },
      details,
      { new: true }
    );
    console.log('Updated user: ', updatedUser);
    return updatedUser;
  }
}
