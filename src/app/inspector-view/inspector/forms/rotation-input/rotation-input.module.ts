import {NgModule} from '@angular/core';
import {RotationInputComponent} from "./rotation-input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [RotationInputComponent],
  exports: [
    RotationInputComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RotationInputModule { }
