import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
        [Validators.required],
      ],
      id: [
        { value: product?.id ?? '', disabled: this.editProduct },
        [Validators.required, Validators.minLength(3)],
      ],
      price: [product?.price ?? '', [Validators.required]],
      installment: [product?.installment ?? '', [Validators.required]],
      urlImg: [product?.urlImg ?? '', [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.editProduct) {
      this.productForm.get('id')?.enable();
      this.serviceproduct
        .editProducts(this.productForm.value)
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
