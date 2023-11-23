import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
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
  renderizaBotaoDelete: boolean = false;
  private subscription: Subscription = new Subscription;

  constructor(
    private serviceProducts: ProductService,
    private dialog: MatDialog,
    private renderHeaderService: RenderHeaderService
  ) {
    this.getProducts();
    this.renderHeaderService.setVariavel(true);
  }

  ngOnInit() {
    this.subscription = this.renderHeaderService.getRole()
    .pipe(
      debounceTime(300), // Evita re-renderizações rápidas
      distinctUntilChanged() // Só reage a mudanças no valor
    ).subscribe((role: string) => {
      this.renderizarIcones(role);
    });
  }

  
  renderizarIcones(role: string): void{
    switch(role){
      case 'ADMIN':
        this.renderizaBotaoDelete = true;
        break;
      case 'FUNCIONARIO':
        this.renderizaBotaoDelete = false;
        break;
      default:
        this.renderizaBotaoDelete = false;
    }
    
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
    dialogRef.afterClosed().subscribe((hasProduct) => {
      if (hasProduct) {
        this.serviceProducts.deleteProducts(product).subscribe((res) => {
          this.getProducts();
        });
      }
    });
  }
}
