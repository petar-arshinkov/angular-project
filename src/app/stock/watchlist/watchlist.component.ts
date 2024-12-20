import { Component, OnInit, OnDestroy } from '@angular/core';
import { Stock } from '../../types/stocks';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { TitleCasePipe, UpperCasePipe, CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [TitleCasePipe, UpperCasePipe, CurrencyPipe],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})


export class WatchlistComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  stocks: Stock[] = [];
  isLoading = false;

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const loggedInUserId = this.userService.user?._id || "";

    this.apiService.getStocks().subscribe((stocks) => {
      this.stocks = stocks.filter((stock) => stock.watchers.includes(loggedInUserId));
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
