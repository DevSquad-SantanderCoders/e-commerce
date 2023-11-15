import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductFormComponent } from 'src/app/modais/delete-product-form/delete-product-form.component';
import { EditProductFormComponent } from 'src/app/modais/edit-product-form/edit-product-form.component';
import { IProduct } from 'src/app/models/product-data.model';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.scss'],
})
export class ListarProdutosComponent {
  constructor(
    private serviceProducts: ProductService,
    private dialog: MatDialog
  ) {
    console.log(this.getProducts());
  }

  products!: IProduct[];
  getProducts() {
    this.serviceProducts.getProducts().subscribe((res) => {
      if (res) {
        this.products = res;
      } else {
        res.error;
      }
    });
  }

  openDialogEditProduct(product: IProduct) {
    const dialogRef = this.dialog.open(EditProductFormComponent, {
      disableClose: true,
      width: '100%',
      height: '70%',
      data: product,
      // backdropClass: 'bdrop',
    });

    dialogRef.afterClosed().subscribe((productUpdated: IProduct) => {
      if (productUpdated) {
        this.getProducts();
      }
    });
  }

  openDialogDeleteProduct(product: IProduct) {
    const dialogRef = this.dialog.open(DeleteProductFormComponent, {
      disableClose: true,
      width: '70%',
      data: product,
    });
    dialogRef.afterClosed().subscribe((productUpdated: IProduct) => {
      if (productUpdated) {
        this.serviceProducts.deleteProducts(product).subscribe((res) => {
          this.getProducts();
        });
      }
    });
  }
}
