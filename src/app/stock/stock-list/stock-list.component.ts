import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Stock } from '../../types/stocks';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { HomeComponent } from '../../home/home.component';
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
    this.apiService.getStocks().subscribe((stocks) => {
      this.stocks = stocks;
      this.isLoading = false;
    });


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
          this.router.navigate(['/watchlist']);
        }, error: (err) => {
          console.error('Error adding stock to watchlist:', err);

        }
      });
  }

  isWatching(stock: Stock): boolean {
    const user = this.userService.user?._id || "";
    return stock.watchers.includes(user);
  }
}
