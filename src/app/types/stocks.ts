import { User } from './user';

export interface Stock {
  _id: string;
  name: string;
  ticker: string;
  price: number;
  watchers: string[];
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}
