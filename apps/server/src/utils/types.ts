import { User } from '../schemas/User';

export type UserDetails = {
  discordId: string;
};

export type Done = (err: Error, user: User) => void;
