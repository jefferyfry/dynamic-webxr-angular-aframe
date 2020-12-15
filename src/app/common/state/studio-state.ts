import {StudioActions} from './studio-actions';
import {ThingamajigModel} from "../../ar-view/ar/models/thingamajig.model";

export interface StudioState {
  studioAction: string | undefined;
  changedThingamajig: string | undefined;
  arState: {
    past: Map<string,ThingamajigModel>[];
    present: Map<string,ThingamajigModel>;
    future: Map<string,ThingamajigModel>[];
  };
}

export const initialStudioState: StudioState = {
  studioAction: StudioActions.INITIAL,
  changedThingamajig: undefined,
  arState: {
    past: [] as Map<string,ThingamajigModel>[],
    present: new Map<string,ThingamajigModel>(),
    future: [] as Map<string,ThingamajigModel>[]
  }
};
