import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Stock,StockToView } from '../../types/stocks';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink, UpperCasePipe, CurrencyPipe, TitleCasePipe, SlicePipe],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {

  stocks: Stock[] = [];
  isLoading = false;
  userId: String = ""


  constructor(private apiService: ApiService, private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.reloadStocks();
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  watchStock(stockId: string): void {
    
    this.apiService
      .watch(stockId)
      .subscribe({
        next: () => {
          this.router.navigate(['/watchlist']);
        }, error: (err) => {
          console.error('Error adding stock to watchlist:', err);

        }
      });
  }

  StopWatchStock(stockId: string): void {
    
    this.apiService
      .unwatch(stockId)
      .subscribe({
        next: () => {
          this.reloadStocks();
        }, error: (err) => {
          console.error('Error adding stock to watchlist:', err);

        }
      });
  }

  reloadStocks(): void {
    this.isLoading = true;
    this.apiService.getStocks().subscribe({
      next: (stocks) => {
        this.stocks = stocks;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error reloading stocks:', err);
        this.isLoading = false;
      },
    });
  }
  

  isWatching(stock: Stock): boolean {
    const user = this.userService.user?._id || "";
    return stock.watchers.includes(user);
  }
}
