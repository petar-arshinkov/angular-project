import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Stock } from '../../types/stocks';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { SlicePipe } from '../../shared/pipes/slice.pipe';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink, UpperCasePipe, CurrencyPipe, TitleCasePipe, SlicePipe],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit{

  stocks: Stock[] = [];
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getStocks().subscribe((stocks) => {
      this.stocks = stocks;
      this.isLoading = false;
    });
  }
}
