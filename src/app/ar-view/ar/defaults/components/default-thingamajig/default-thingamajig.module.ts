import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultThingamajigComponent} from './default-thingamajig.component';

@NgModule({
  declarations: [DefaultThingamajigComponent],
  imports: [CommonModule],
  providers: [],
  exports: [DefaultThingamajigComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DefaultThingamajigModule {
}
