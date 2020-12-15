import {NgModule} from '@angular/core';
import {PositionInputComponent} from "./position-input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [PositionInputComponent],
  exports: [
    PositionInputComponent
  ],
    imports: [
        ReactiveFormsModule,
        CommonModule
    ]
})
export class PositionInputModule { }
