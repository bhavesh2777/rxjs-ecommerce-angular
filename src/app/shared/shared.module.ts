import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../modules/material.module';
import { CardComponent } from './components/card/card.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { OnlyNumber } from './directives/only-number.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CommonTableComponent,
    OnlyNumber,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    CommonTableComponent,
    OnlyNumber,
  ],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
