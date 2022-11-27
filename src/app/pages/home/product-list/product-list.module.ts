import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductListComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ProductListModule {}
