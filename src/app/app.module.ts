import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ArViewModule} from './ar-view/ar-view.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {InspectorViewModule} from './inspector-view/inspector-view.module';
import {StoreModule} from '@ngrx/store';
import {studioStateReducer} from './common/state/state-engine';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ArViewModule,
    MatIconModule,
    InspectorViewModule,
    StoreModule.forRoot({studioState: studioStateReducer}, {}),
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
