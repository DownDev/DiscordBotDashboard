import { User } from '../../schemas/User';
import { UserDetails } from '../../utils/types';

export interface IUserService {
  createUser(details: UserDetails): Promise<User>;
  findUser(discordId: string): Promise<User | undefined>;
  updateUser(user: User, details: UserDetails): Promise<User>;
}
