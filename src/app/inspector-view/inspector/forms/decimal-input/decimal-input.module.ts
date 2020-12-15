import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DecimalInputComponent} from "./decimal-input.component";


@NgModule({
  declarations: [DecimalInputComponent],
  exports: [
    DecimalInputComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DecimalInputModule { }
