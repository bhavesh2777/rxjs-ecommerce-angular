import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../modules/material.module';
import { CardComponent } from './card/card.component';
import { CommonTableComponent } from './common-table/common-table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CommonTableComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CommonTableComponent,
  ],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
