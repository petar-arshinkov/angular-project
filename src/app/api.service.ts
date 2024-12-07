import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from './types/stocks';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // getPosts(limit?: number) {
  //   let url = `/api/posts`;
  //   if (limit) {
  //     url += `?limit=${limit}`;
  //   }

  //   return this.http.get<Post[]>(url);
  // }

  getStocks() {
    return this.http.get<Stock[]>(`/api/stocks`);
  }

   getSingleStock(id: string) {
    return this.http.get<Stock>(`/api/stocks/${id}`);
  }

  // getSingleTheme(id: string) {
  //   return this.http.get<Theme>(`/api/themes/${id}`);
  // }

  createStock(stockName: string, stockTicker: string, sharePrice: number) {
    const payload = { stockName, stockTicker, sharePrice };
    return this.http.post<Stock>(`/api/stocks`, payload);
  }

  // // CRUD operations
  // // update -> http.put
  // updateTheme(themeId: string, themeName: string, postText: string) {
  //   const payload = { themeName, postText };
  //   return this.http.put<Theme>(`/api/themes/${themeId}`, payload);
  // }

  // updatePost(themeId: string, postId: string) {
  //   const payload = {};
  //   return this.http.put<Theme>(
  //     `/api/themes/${themeId}/posts/${postId}`,
  //     payload
  //   );
  // }

  // // delete -> http.delete theme ID
  // deletePost(themeId: string, postId: string) {
  //   return this.http.delete(`/api/themes/${themeId}/posts/${postId}`);
  // }
}
 