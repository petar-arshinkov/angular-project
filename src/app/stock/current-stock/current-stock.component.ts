import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../../types/stocks';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { HomeComponent } from '../../home/home.component';
import { UpperCasePipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, } from '@angular/forms';


@Component({
  selector: 'app-current-stock',
  standalone: true,
  imports: [ UpperCasePipe, TitleCasePipe, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './current-stock.component.html',
  styleUrl: './current-stock.component.css'
})
export class CurrentStockComponent implements OnInit {
  isEditMode: boolean = false;
  stock = {} as Stock;
  form = new FormGroup({
    stockName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    stockTicker: new FormControl('', [Validators.required, Validators.minLength(3)]),
    sharePrice: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(1000)]),
    stockDescription: new FormControl('', [Validators.required, Validators.minLength(10)]),
    stockLogoLink: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });



  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  get isOwner(): boolean {    
    return this.stock.userId?._id === this.userService.user?._id;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['stockId'];

      this.loadStockData(id);


  }



  loadStockData(stockId: string): void {
    this.apiService.getSingleStock(stockId).subscribe((stock) => {
      this.stock = stock;
      this.form.setValue({
        stockName: stock.stockName || '',
        stockTicker: stock.stockTicker || '',
        sharePrice: stock.sharePrice || 0,
        stockDescription: stock.stockDescription || '',
        stockLogoLink: stock.stockLogoLink || '',
      });

      console.log(this.isOwner);
      
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }

  updateStock(): void {
    if (this.form.invalid) {
      return;
    }

    const stockId = this.route.snapshot.params['stockId'];
    const updatedStock = this.form.value;


    this.apiService
      .editStock(
        stockId,
        updatedStock.stockName!,
        updatedStock.stockTicker!,
        updatedStock.sharePrice!,
        updatedStock.stockDescription!,
        updatedStock.stockLogoLink!
      )
      .subscribe({
        next: () => {

          this.router.navigate([`/stocks/${stockId}`])
          this.toggleEditMode();
          this.loadStockData(stockId);
        }, error: (err) => {
          console.error('Error editing stock:', err);

        }
      });
  }

  deleteStock(): void {
    const stockId = this.route.snapshot.params['stockId'];

    this.apiService
      .deleteStock(stockId)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error deleting stock:', err);

        }
      });
  }

}
