import { User } from '../schemas/User';

export type UserDetails = {
  discordId: string;
  accessToken: string;
  refreshToken: string;
};

export type Done = (err: Error, user: User) => void;
