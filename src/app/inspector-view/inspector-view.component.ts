import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {StudioState} from "../common/state/studio-state";
import {select, Store} from "@ngrx/store";
import {StudioActions, updateThingamajig} from "../common/state/studio-actions";
import {InspectorModel} from "./inspector/models/inspector.model";
import {InspectorEngine} from "./inspector/services/inspector-engine.service";
import {Thingamajig} from "../common/interfaces/thingamajig.interface";
import {ThingamajigUpdatedAction} from "./inspector/actions/thingamajig-updated.action";

@Component({
  selector: 'app-inspector-view',
  templateUrl: './inspector-view.component.html',
  styleUrls: ['./inspector-view.component.scss']
})
export class InspectorViewComponent implements OnInit {

  studioState$: Observable<StudioState>;
  inspectorModel: InspectorModel;

  constructor(private store: Store<{ studioState: StudioState }>,private inspectorEngine: InspectorEngine) {
    this.studioState$ = store.pipe(select('studioState'));
  }

  ngOnInit(): void {
    this.inspectorEngine.registerDefaultFactories();
    this.inspectorModel = this.inspectorEngine.createInspector();
    this.studioState$.subscribe((studioState: StudioState) => {
      this.processChange(studioState);
    });
  }

  private processChange(studioState: StudioState){
    switch (studioState.studioAction) {
      case StudioActions.ADD_THINGAMAJIG:{
        if (studioState.arState.present != undefined){
          this.inspectorModel.clearAll();
          this.setModels(studioState.arState.present);
        }
        else {
          this.inspectorModel.clearAll();
        }
        break;
      }
    }
  }

  private setModels(thingamajigs: Map<string,Thingamajig>): void {
    this.inspectorModel.addThingamajig(thingamajigs);
  }

  onActionFired(action: any) {
    console.log("onActionFired: ");
    console.log(action);
    if (action instanceof ThingamajigUpdatedAction){
      const updateAction = action as ThingamajigUpdatedAction;
      this.store.dispatch(updateThingamajig({thingamajig: updateAction.thingamajig}));
    }
  }
}
