import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../../types/stocks';
// import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-current-stock',
  standalone: true,
  imports: [],
  templateUrl: './current-stock.component.html',
  styleUrl: './current-stock.component.css'
})
export class CurrentStockComponent implements OnInit {
  stock = {} as Stock;

  constructor(
    private route: ActivatedRoute,
    // private apiService: ApiService,
    // private userService: UserService
  ) {}

  // get isLoggedIn(): boolean {
  //   return this.userService.isLogged;
  // }

  // get username(): string {
  //   return this.userService.user?.username || '';
  // }

  ngOnInit(): void {
    const id = this.route.snapshot.params['stockId'];

    // this.apiService.getSingleTheme(id).subscribe((theme) => {
    //   this.theme = theme;
    // });
  }
}
