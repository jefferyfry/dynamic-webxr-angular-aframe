import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {InspectorViewComponent} from './inspector-view.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {ContextMenuModule} from "../common-ui/context-menu/context-menu.module";
import {InspectorModule} from "./inspector/inspector.module";
import {DefaultThingamajigPanelModule} from "./inspector/defaults/panels/thingamajig-panel/default-thingamajig-panel.module";

@NgModule({
  declarations: [
    InspectorViewComponent
  ],
  imports: [
    DefaultThingamajigPanelModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    MatExpansionModule,
    ContextMenuModule,
    InspectorModule
  ],
  providers: [],
  exports: [
    InspectorViewComponent
  ]
})
export class InspectorViewModule { }
