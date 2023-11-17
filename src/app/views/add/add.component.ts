import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditProductFormComponent } from 'src/app/modais/edit-product-form/edit-product-form.component';
import { IProduct } from 'src/app/models/product-data.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
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
    this.serviceproduct.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  ngOnInit() {
    this.buildForm(this.currentProduct);
  }

  public buildForm(product: IProduct): void {
    this.productForm = this.fb.group({
      nome: [
        product?.name ?? '',
        [Validators.required, Validators.minLength(3)],
      ],
      marca: [
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

  closeModal() {
    this.fecharModal.emit(true)
  }
}
