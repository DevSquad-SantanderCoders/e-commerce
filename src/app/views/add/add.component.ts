import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-ts';
import { IProduct } from 'src/app/models/product-data.model';
import { ProductService } from 'src/app/services/product.service';
import { RenderHeaderService } from 'src/app/services/render-header.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  @Input() currentProduct!: IProduct;
  @Input() editProduct: boolean = false;
  @Output() public fecharModal = new EventEmitter<any>();

  public productForm!: FormGroup;
  public products!: IProduct[];
  public idProduct!: string;

  constructor(
    private fb: FormBuilder,
    private serviceproduct: ProductService,
    private router: Router,
    private renderHeaderService: RenderHeaderService
  ) {
    this.serviceproduct.getProducts().subscribe((res) => {
      this.products = res;
    });
    this.renderHeaderService.setVariavel(true);
  }

  ngOnInit() {
    if(this.editProduct){
      this.idProduct = this.currentProduct.id;
    }
    this.buildForm(this.currentProduct);
  }

  public buildForm(product: IProduct): void {
    this.productForm = this.fb.group({
      name: [
        product?.name ?? '',
        [Validators.required, Validators.minLength(3)],
      ],
      brand: [
        product?.brand ?? '',
        [Validators.required, Validators.minLength(2)],
      ],
      
      price: [product?.price ?? '', [Validators.required]],
      installment: [product?.installment ?? '', [Validators.required, Validators.max(5), Validators.min(2), Validators.minLength(1), Validators.maxLength(1)]],
      urlImg: [product?.urlImg ?? '', [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.editProduct) {
      this.serviceproduct
        .editProducts(this.productForm.value, this.idProduct)
        .subscribe((res) => {
          this.fecharModal.emit(true);
        });
    } else {
      this.serviceproduct
        .createProducts(this.productForm.value)
        .subscribe((res) => {
          this.router.navigate(['/listarProdutos']);
        });
    }
  }

  public onCancel(): void {
    if (this.editProduct) {
      this.fecharModal.emit(false);
    } else {
      this.router.navigate(['/listarProdutos']);
    }
  }

  closeModal() {
    this.fecharModal.emit(true);
  }
}
