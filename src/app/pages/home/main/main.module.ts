import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule, SharedModule],
})
export class MainModule {}
