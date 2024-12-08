import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Stock, StockDetails } from '../../types/stocks';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { HomeComponent } from '../../home/home.component';
import { UpperCasePipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import {FormGroup,FormControl,Validators,ReactiveFormsModule,} from '@angular/forms';


@Component({
  selector: 'app-current-stock',
  standalone: true,
  imports: [HomeComponent, UpperCasePipe, TitleCasePipe, CurrencyPipe, ReactiveFormsModule],
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
  router: any;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) { }

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

      this.form.setValue({
        stockName: stock.stockName || '',
        stockTicker: stock.stockTicker || '',
        sharePrice: stock.sharePrice || 0,
        stockDescription: stock.stockDescription || '',
        stockLogoLink: stock.stockLogoLink || '',
      });
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
console.log(updatedStock);

    this.apiService
    .editStock(
      stockId,
      updatedStock.stockName!,
      updatedStock.stockTicker!,
      updatedStock.sharePrice!,
      updatedStock.stockDescription!,
      updatedStock.stockLogoLink!
    )
    .subscribe(() => {
      this.toggleEditMode();
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
