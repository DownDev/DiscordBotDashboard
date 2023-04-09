import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { IAuthService } from '../interfaces/auth';
import { UserDetails } from '../../utils/types';
import { User } from '../../schemas/User';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(details: UserDetails): Promise<User> {
    const user = await this.userService.findUser(details.discordId);
    return user || this.userService.createUser(details);
  }
}
