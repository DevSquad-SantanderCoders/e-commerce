import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product-data.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {}


  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/products')
  }

  createProducts(product: IProduct): Observable<any>  {
    return this.http.post('http://localhost:3000/products', product)
  }

  editProducts(product: IProduct): Observable<any>  {
    return this.http.put(`http://localhost:3000/products/${product.id}`, product)
  }

  deleteProducts(product: IProduct): Observable<any>  {
    return this.http.delete(`http://localhost:3000/products/${product.id}`)
  }
}
