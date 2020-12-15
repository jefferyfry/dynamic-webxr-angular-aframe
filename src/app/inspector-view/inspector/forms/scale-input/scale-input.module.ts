import {NgModule} from '@angular/core';
import {ScaleInputComponent} from "./scale-input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [ScaleInputComponent],
  exports: [
    ScaleInputComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ScaleInputModule { }
