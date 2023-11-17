import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { IProduct } from '../models/product-data.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(environment.URL + '/products');
  }

  createProducts(product: IProduct): Observable<any> {
    return this.http.post(environment.URL + '/products', product);
  }

  editProducts(product: IProduct): Observable<any> {
    return this.http.put(environment.URL + `/products/${product.id}`, product);
  }

  deleteProducts(product: IProduct): Observable<any> {
    return this.http.delete(environment.URL + `/products/${product.id}`);
  }
}
