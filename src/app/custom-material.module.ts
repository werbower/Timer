import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatTooltipModule,
 } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
  ]
})
export class CustomMaterialModule { }
