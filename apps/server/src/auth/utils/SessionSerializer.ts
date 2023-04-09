import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../schemas/User';
import { Done } from '../../utils/types';
import { UserService } from '../../user/services/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(user: User, done: Done) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Done) {
    try {
      const userDb = await this.userService.findUser(user.discordId);
      return userDb ? done(null, userDb) : done(null, null);
    } catch (err) {
      done(err, null);
    }
  }
}
