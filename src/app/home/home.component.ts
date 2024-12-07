import { Component } from '@angular/core';

import { StockListComponent } from '../stock/stock-list/stock-list.component';

import { UserService } from '../user/user.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { AddStockComponent } from "../stock/add-stock/add-stock.component";
import { LoginComponent } from "../user/login/login.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StockListComponent, AddStockComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // get isLoggedIn(): boolean {
  //   return this.userService.isLogged;
  // }

  // constructor(private userService: UserService) {}
}
