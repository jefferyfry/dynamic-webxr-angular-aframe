import {BaseAction} from "../actions/base.action";
import {Thingamajig} from "../../../common/interfaces/thingamajig.interface";

export abstract class AbstractThingamajigPanelComponent<T extends Thingamajig> {

  model: T;
  actionCallback: (action:BaseAction)=>void;
  expanded = true;

  constructor() {
  }

  update(){
    console.log('update');
    //this.actionCallback(undefined);
  }
}
