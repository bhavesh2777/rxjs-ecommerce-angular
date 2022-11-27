import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { numberOnlyRegex } from 'src/app/global';
import { CommonService } from 'src/app/services/common.service';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  addProductForm: FormGroup;
  addProduct = false;
  addProductLoader = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly homeService: HomeService,
    private readonly commonService: CommonService
  ) {
    this.prepareAddProductForm();
  }

  submitAddProduct() {
    this.addProductLoader = true;
    if (this.addProductForm.valid) {
      const productBody = {
        title: this.addProductForm.controls['productName'].value,
        description: this.addProductForm.controls['productDetails'].value,
        price: +this.addProductForm.controls['productPrice'].value,
      };
      const addProductResObs$ = this.homeService.addProductApi(productBody);
      addProductResObs$.subscribe({
        next: this.handleAddResponse.bind(this),
        error: this.handleAddError.bind(this),
      });
      // Observable triggered only once no need to unsubscribe
    } else {
      this.addProductLoader = false;
      this.commonService.openErrorSnackBar();
    }
  }

  private handleAddResponse(response) {
    this.homeService.addProductsEffects(response);
    this.commonService.openSuccessSnackBar('Product added successfully!');
    this.addProductForm.reset();
    this.addProductLoader = false;
    this.addProduct = false;
  }

  private handleAddError(err) {
    this.addProductLoader = false;
    this.commonService.openErrorSnackBar();
  }

  private prepareAddProductForm() {
    this.addProductForm = this._formBuilder.group({
      productName: new FormControl(null, [Validators.required]),
      productDetails: new FormControl(null, [Validators.required]),
      productPrice: new FormControl(0, [
        Validators.required,
        Validators.pattern(numberOnlyRegex),
      ]),
    });
  }
}
