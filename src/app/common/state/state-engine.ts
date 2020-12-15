import {createReducer, on} from '@ngrx/store';
import {initialStudioState} from './studio-state';
import {addThingamajig, updateThingamajig, redo, StudioActions, undo} from './studio-actions';
import {cloneDeep} from 'lodash-es';
import {DefaultThingamajigModel} from "../../ar-view/ar/defaults/models/default-thingamajig.model";
import {Thingamajig} from "../interfaces/thingamajig.interface";

const stateEngine = createReducer(initialStudioState,
  on(addThingamajig, (state, action) => {
    const { past, present, future } = state.arState;
    const updatedState = cloneDeep<Map<string,Thingamajig>>(state.arState.present);
    const newThingamajig = new DefaultThingamajigModel({x: action.posX, y: action.posY, z: action.posZ});
    updatedState.set(newThingamajig.id,newThingamajig);
    return {
      studioAction: StudioActions.ADD_THINGAMAJIG,
      changedThingamajig: newThingamajig.id,
      arState: {
        past: [...past, present],
        present: updatedState,
        future: [...future]
      }
    };
  }),
  on(updateThingamajig, (state, action) => {
    const { past, present, future } = state.arState;
    const updatedState = cloneDeep<Map<string,Thingamajig>>(state.arState.present);
    updatedState.set(action.thingamajig.id,action.thingamajig);
    return {
      studioAction: StudioActions.UPDATE_THINGAMAJIG,
      changedThingamajig: action.thingamajig.id,
      arState: {
        past: [...past, present],
        present: updatedState,
        future: [...future]
      }
    };
  }),
  on(undo, (state, action) => {
    const { past, present, future } = state.arState;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    return {
      studioAction: StudioActions.UNDO,
      changedThingamajig: undefined,
      arState: {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    };
  }),
  on(redo, (state, action) => {
    const { past, present, future } = state.arState;
    const next = future[0];
    const newFuture = future.slice(1);
    return {
      studioAction: StudioActions.REDO,
      changedThingamajig: undefined,
      arState: {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    };
  })
);

export function studioStateReducer(state, action){
  return stateEngine(state, action);
}
