import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from './types/stocks';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }
  stock: Stock | null = null;


  getStocks() {
    return this.http.get<Stock[]>(`/api/stocks`);
  }

  getSingleStock(id: string) {
    return this.http.get<Stock>(`/api/stocks/${id}`);
  }

  watch(stockId: string) {
    
    return this.http.put<Stock>(`/api/stocks/watch/${stockId}`,{stockId});
  }

  unwatch(stockId: string) {
    
    return this.http.put<Stock>(`/api/stocks/unwatch/${stockId}`,{stockId});
  }

  createStock(stockName: string, stockTicker: string, sharePrice: number, stockDescription: string, stockLogoLink: string) {
    const payload = { stockName, stockTicker, sharePrice, stockDescription, stockLogoLink };
    return this.http.post<Stock>(`/api/stocks`, payload);
  }

  editStock(
    stockId: string,
    stockName: string,
    stockTicker: string,
    sharePrice: number,
    stockDescription: string,
    stockLogoLink: string
  ) {
    const payload = { stockId, stockName, stockTicker, sharePrice, stockDescription, stockLogoLink };
    return this.http.put<Stock>(`/api/stocks/${stockId}`, payload);
  }
  
  deleteStock(id: string) {
    return this.http.delete(`/api/stocks/delete/${id}`);
  }
  
  

  // // CRUD operations
  // update -> http.put
  // updateStock(stockId: string, stockName: string, stockTicker: string, sharePrice: number, stockDescription: string, stockLogoLink: string) {
  //   const payload = { stockId, stockName, stockTicker, sharePrice, stockDescription, stockLogoLink };
  //   return this.http.put(`/api/stocks/${stockId}`, payload);
  // }

  // updatePost(themeId: string, postId: string) {
  //   const payload = {};
  //   return this.http.put<Theme>(
  //     `/api/themes/${themeId}/posts/${postId}`,
  //     payload
  //   );
  // }

  // // delete -> http.delete theme ID
  // deleteStock(stockId: string) {
  //   return this.http.delete(`/api/stocks/${stockId}`);
  // }
}
