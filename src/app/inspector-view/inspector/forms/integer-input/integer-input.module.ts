import {NgModule} from '@angular/core';
import {IntegerInputComponent} from "./integer-input.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [IntegerInputComponent],
  exports: [
    IntegerInputComponent
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class IntegerInputModule { }
