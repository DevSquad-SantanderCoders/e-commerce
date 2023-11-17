import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/product-data.model';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.currentProduct = this.data;
      this.editProduct = true;
    } else {
      this.editProduct = false;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
