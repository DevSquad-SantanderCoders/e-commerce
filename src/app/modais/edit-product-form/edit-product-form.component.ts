import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product-data.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent {
  public productForm!: FormGroup;
  currentProduct!: IProduct;
  editProduct: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<EditProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private serviceProduct: ProductService,
    router: Router
  ) {
    if (this.data) {
      this.currentProduct = this.data;
      this.editProduct = true;
      this.buildForm(this.currentProduct);
    } else {
      this.editProduct = false;
      this.buildForm(this.currentProduct);
    }
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
        [Validators.required, Validators.minLength(8)],
      ],
      id: [product?.code ?? '', [Validators.required, Validators.minLength(3)]],
      price: [product?.price ?? '', [Validators.required]],
      installment: [product?.installment ?? '', [Validators.required]],
      urlImg: [product?.urlImg ?? '', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.dialogRef.close(this.productForm.value);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
