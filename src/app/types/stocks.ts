import { User } from './user';

export interface Stock {
  _id: string;
  stockName: string;
  stockTicker: string;
  sharePrice: number;
  watchers: string[];
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}
