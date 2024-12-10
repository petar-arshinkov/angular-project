import { User } from './user';

export interface Stock {
  _id: string;
  stockName: string;
  stockTicker: string;
  sharePrice: number;
  stockDescription: string;
  stockLogoLink: string;
  watchers: string[];
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}


export interface StockDetails {
  stockName: string;
  stockTicker: string;
  sharePrice: string;
  stockDescription: string;
  stockLogoLink: string;
}

export interface StockToView {
  stockName: string;
  stockTicker: string;
  sharePrice: number;
  stockDescription: string;
  stockLogoLink: string;
}