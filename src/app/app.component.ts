import {Component, HostListener} from '@angular/core';
import {Store} from '@ngrx/store';
import {StudioState} from './common/state/studio-state';
import {redo, undo} from './common/state/studio-actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static readonly MAX_WIDTH = 25;
  static readonly MIN_WIDTH = 4;
  isInspectorViewExpanded = true;
  sidenavWidth = AppComponent.MAX_WIDTH;

  title = 'web-studio';

  direction = 'vertical';
  sizes = {
    percent: {
      area1: 30,
      area2: 70,
    },
    pixel: {
      area1: 120,
      area2: '*',
      area3: 160,
    },
  };

  @HostListener('document:keydown.meta.z', ['$event'])
  undo(event: KeyboardEvent){
    event.preventDefault();
    this.store.dispatch(undo());
    console.log('Undo');
  }

  @HostListener('document:keydown.meta.zy', ['$event'])
  redo(event: KeyboardEvent){
    event.preventDefault();
    this.store.dispatch(redo());
    console.log('Redo');
  }

  constructor(private store: Store<{ studioState: StudioState }>) {
  }

  dragEnd(unit, {sizes}) {
    if (unit === 'percent') {
      this.sizes.percent.area1 = sizes[0];
      this.sizes.percent.area2 = sizes[1];
    }
    else if (unit === 'pixel') {
      this.sizes.pixel.area1 = sizes[0];
      this.sizes.pixel.area2 = sizes[1];
      this.sizes.pixel.area3 = sizes[2];
    }
  }

  toggle(){
    this.isInspectorViewExpanded ? this.minimize() : this.maximize();
  }

  maximize(){
    this.sidenavWidth = AppComponent.MAX_WIDTH;
    this.isInspectorViewExpanded = true;
  }
  minimize(){
    this.sidenavWidth = AppComponent.MIN_WIDTH;
    this.isInspectorViewExpanded = false;
  }
}
