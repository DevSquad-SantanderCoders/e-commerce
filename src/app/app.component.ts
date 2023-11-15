import { Component } from '@angular/core';
import { IProduct } from './models/product-data.model';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';
  products?: IProduct[];

  constructor(private serviceProduct: ProductService){
      this.serviceProduct.getProducts().subscribe((res) => {
        this.products = res
      })
  }
}
