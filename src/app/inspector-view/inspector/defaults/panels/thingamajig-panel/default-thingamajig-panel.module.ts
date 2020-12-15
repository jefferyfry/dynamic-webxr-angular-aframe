import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultThingamajigPanelComponent} from "./default-thingamajig-panel.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PositionInputModule} from "../../../forms/position-input/position-input.module";
import {RotationInputModule} from "../../../forms/rotation-input/rotation-input.module";
import {IntegerInputModule} from "../../../forms/integer-input/integer-input.module";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ScaleInputModule} from "../../../forms/scale-input/scale-input.module";
import {DecimalInputModule} from "../../../forms/decimal-input/decimal-input.module";

@NgModule({
  declarations: [DefaultThingamajigPanelComponent],
    imports: [
        CommonModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        PositionInputModule,
        RotationInputModule,
        IntegerInputModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        ScaleInputModule,
        DecimalInputModule
    ],
  exports: [DefaultThingamajigPanelComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DefaultThingamajigPanelModule { }
