import {NgModule} from '@angular/core';
import {ArViewComponent} from './ar-view.component';
import {ContextMenuModule} from "../common-ui/context-menu/context-menu.module";
import {MatMenuModule} from "@angular/material/menu";
import {ArModule} from "./ar/ar.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ArViewComponent
  ],
  imports: [
    ContextMenuModule,
    MatMenuModule,
    ArModule,
    CommonModule
  ],
  providers: [],
  exports: [
    ArViewComponent
  ]
})
export class ArViewModule { }
