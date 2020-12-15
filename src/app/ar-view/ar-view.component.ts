import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {StudioState} from "../common/state/studio-state";
import {Observable} from "rxjs";
import {ArModel} from "./ar/models/ar.model";
import {ArEngine} from "./ar/services/ar-engine.service";
import {addThingamajig, StudioActions} from "../common/state/studio-actions";
import {ThingamajigModel} from "./ar/models/thingamajig.model";

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar-view.component.html',
  styleUrls: ['./ar-view.component.scss'],
})
export class ArViewComponent implements OnInit {
  studioState$: Observable<StudioState>;
  arModel: ArModel;
  constructor(private store: Store<{ studioState: StudioState }>,
              private arEngine: ArEngine) {
    this.studioState$ = store.pipe(select('studioState'));
  }

  ngOnInit(): void {
    this.arEngine.registerDefaultFactories();
    this.arModel = this.arEngine.createAr();

    this.studioState$.subscribe((studioState: StudioState) => {
      this.processChange(studioState);
    });
  }

  private processChange(studioState: StudioState){
    switch (studioState.studioAction){
      case StudioActions.ADD_THINGAMAJIG: {
        if (studioState.arState.present != undefined){
          this.arModel.clearAll();
          this.setModels(studioState.arState.present);
        }
        else {
          this.arModel.clearAll();
        }
      }
    }
  }

  private setModels(thingamajigs: Map<string,ThingamajigModel>): void {
    for(let thingamajigModel of thingamajigs.values()){
      this.arModel.addThingamajig(thingamajigModel);
    }
  }

  onActionStarted(action: any) {
    console.log("onActionStarted: ");
    console.log(action);
  }

  onActionStill(action: any) {
    console.log("onActionStill: ");
    console.log(action);
  }

  onActionStopped(action: any) {
    console.log("onActionStopped: ");
    console.log(action);
  }

  addThingamajigMenuItemEnabled() {
    return this.arModel.getSelectedItems().length === 0;
  }

  addNewThingamajig($event: MouseEvent) {
    this.store.dispatch(addThingamajig({posX:Math.random()*1, posY:Math.random()*1, posZ:1}));
  }
}
