import {NgModule} from '@angular/core';
import {InspectorComponent} from './inspector.component';
import {CommonModule} from '@angular/common';
import {ContextMenuModule} from '../../common-ui/context-menu/context-menu.module';
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [InspectorComponent],
  imports: [CommonModule,
    ContextMenuModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [],
  exports: [InspectorComponent]
})
export class InspectorModule {
}
