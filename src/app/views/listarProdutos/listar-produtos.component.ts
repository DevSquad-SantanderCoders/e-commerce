import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductFormComponent } from 'src/app/modais/delete-product-form/delete-product-form.component';
import { EditProductFormComponent } from 'src/app/modais/edit-product-form/edit-product-form.component';
import { IProduct } from 'src/app/models/product-data.model';
import { ProductService } from 'src/app/services/product.service';
import { RenderHeaderService } from 'src/app/services/render-header.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.scss'],
})
export class ListarProdutosComponent {
  products!: IProduct[];
  constructor(
    private serviceProducts: ProductService,
    private dialog: MatDialog,
    private renderHeaderService: RenderHeaderService
  ) {
    this.getProducts();
    this.renderHeaderService.setVariavel(true);
  }

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
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }

  openDialogDeleteProduct(product: IProduct) {
    const dialogRef = this.dialog.open(DeleteProductFormComponent, {
      disableClose: true,
      width: '70%',
      data: product,
    });
    dialogRef.afterClosed().subscribe((hasProduct: IProduct) => {
      if (hasProduct) {
        this.serviceProducts.deleteProducts(product).subscribe((res) => {
          this.getProducts();
        });
      }
    });
  }
}
