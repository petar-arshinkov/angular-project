import { Component } from '@angular/core';
// import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.css',
})
export class AddStockComponent {
  constructor(private router: Router) {}

  addStock(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { StockName } = form.value;
    console.log(form);
    
    // this.apiService.createTheme(StockName, postText).subscribe(() => {
    //   this.router.navigate(['/stocks']);
    // });
  }
}
