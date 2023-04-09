import { User } from '../../schemas/User';
import { UserDetails } from '../../utils/types';

export interface IAuthService {
  validateUser(details: UserDetails): Promise<User>;
}
