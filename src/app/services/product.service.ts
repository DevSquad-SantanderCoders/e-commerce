import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product-data.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private maxId = 5;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {

        return this.http.get(environment.URL + '/products');
  }

  createProducts(product: IProduct): Observable<any> {
    const productId = { ...product, id: this.maxId };
    this.maxId++;
    return this.http.post(environment.URL + '/products', productId);
  }

  editProducts(product: IProduct): Observable<any> {
    return this.http.put(
      environment.URL + `/products/${product.code}`,
      product
    );
  }

  deleteProducts(product: IProduct): Observable<any> {
    return this.http.delete(environment.URL + `/products/${product.code}`);

  }
}
