import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EditProductFormComponent } from 'src/app/modais/edit-product-form/edit-product-form.component';
import { IProduct } from 'src/app/models/product-data.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  @Input() editProduct: boolean = false;
  @Input() currentProduct!: IProduct;
  // @Output() public closeModal = new EventEmitter<any>();
  constructor(public dialogRef: MatDialogRef<EditProductFormComponent>) {}
  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
