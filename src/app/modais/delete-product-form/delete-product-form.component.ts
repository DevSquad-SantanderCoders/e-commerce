import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/product-data.model';

@Component({
  selector: 'app-delete-product-form',
  templateUrl: './delete-product-form.component.html',
  styleUrls: ['./delete-product-form.component.scss'],
})
export class DeleteProductFormComponent {
  currentProduct!: IProduct;
  notExcludedProduct: boolean = false;
  actionCompleted: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentProduct = this.data;
  }
  public onCancel(): void {
    this.actionCompleted = true;
    this.notExcludedProduct = true;
    setTimeout(() => {
      this.dialogRef.close(false);
    }, 1500);
  }

  deleteProduct(): void {
    this.actionCompleted = true;
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 1500);
  }
}
