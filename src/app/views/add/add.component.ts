import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product-data.model';
import { ProductService } from 'src/app/services/product.service';

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
    private router: Router
  ) {
    // this.serviceproduct.getProducts().subscribe((res) => {
    //   this.products = res;
    // });
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
        product?.id ?? '',
        [Validators.required, Validators.minLength(1)],
      ],
      preco: [product?.price ?? '', [Validators.required]],
      parcelas: [product?.installment ?? '', [Validators.required]],
      urlIMG: [product?.urlImg ?? '', [Validators.required, Validators.minLength(2)]],
    });
  }

  public onSubmit(): void {
    if (this.editProduct) {
      this.serviceproduct.editProducts(this.productForm.value).subscribe((res) => {
        this.fecharModal.emit(true)
      });
    } else {      
      console.log('form value',this.productForm.value);
      this.serviceproduct.createProducts(this.productForm.value).subscribe((res) => {
        console.log('foi produtos',this.products);
        this.router.navigate(['/listar-produtos']);
      });
    }
  }

  public onCancel(): void {
    if (this.editProduct) {
      this.fecharModal.emit(true);
    } else {
      this.router.navigate(['/listarProdutos']);
    }
  }

  closeModal() {
    this.fecharModal.emit(true);
  }
}
