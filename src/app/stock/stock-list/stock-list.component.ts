import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Stock } from '../../types/stocks';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [LoaderComponent, LoaderComponent],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit{

  stocks: Stock[] = [];
  isLoading = false;

  constructor() {}

  ngOnInit() {
    // this.apiService.getStocks().subscribe((stocks) => {
    //   this.stocks = stocks;
    //   this.isLoading = false;
    // });
  }
}
