import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Stock } from '../../types/stocks';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-current-stock',
  standalone: true,
  imports: [RouterLink, HomeComponent],
  templateUrl: './current-stock.component.html',
  styleUrl: './current-stock.component.css'
})
export class CurrentStockComponent implements OnInit {
  stock = {} as Stock;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['stockId'];

    this.apiService.getSingleStock(id).subscribe((stock) => {
      this.stock = stock;
    });
  }
}
