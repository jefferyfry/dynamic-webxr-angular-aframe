import {createAction, props} from '@ngrx/store';
import {Thingamajig} from "../interfaces/thingamajig.interface";

export const undo = createAction('studio-actions.undo');
export const redo = createAction('studio-actions.redo');
export const addThingamajig = createAction('studio-actions.addThingamajig', props <{posX: number; posY: number; posZ: number; }>());
export const updateThingamajig = createAction('studio-actions.updateThingamajig', props <{thingamajig: Thingamajig; }>());

export class StudioActions {
  static readonly INITIAL = 'INITIAL';
  static readonly ADD_THINGAMAJIG = 'addThingamajig';
  static readonly UPDATE_THINGAMAJIG = 'updateThingamajig';
  static readonly UNDO = 'undo';
  static readonly REDO = 'redo';
}
