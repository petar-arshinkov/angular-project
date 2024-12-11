import { Component } from '@angular/core';
import { StockListComponent } from '../stock/stock-list/stock-list.component';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StockListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) {}
}
