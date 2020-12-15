import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContextMenuModule} from '../../common-ui/context-menu/context-menu.module';
import {MatMenuModule} from '@angular/material/menu';
import {ArComponent} from "./ar.component";

@NgModule({
  declarations: [ArComponent],
  imports: [CommonModule, ContextMenuModule, MatMenuModule],
  providers: [],
  exports: [ArComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ArModule {
}
