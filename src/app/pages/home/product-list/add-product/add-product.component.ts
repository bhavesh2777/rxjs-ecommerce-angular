import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  addProductForm: FormGroup;
  addProduct = false;

  constructor(private readonly _formBuilder: FormBuilder) {
    this.addProductForm = this._formBuilder.group({
      productName: new FormControl(null, [Validators.required]),
      productDetails: new FormControl(null, [Validators.required]),
      productPrice: new FormControl(null, [Validators.required]),
    });
  }

  submitAddProduct() {
    this.addProduct = false;
  }
}
