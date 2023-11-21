import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/product-data.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
})
export class ProductsCarouselComponent {
  products!: IProduct[];

  responsiveOptions;

  constructor(private productService: ProductService) {
    this.responsiveOptions = [
      {
        breakpoint: '1454px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1124px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '780px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
