import {BaseAction} from "./base.action";
import {Thingamajig} from "../../../common/interfaces/thingamajig.interface";

export class ThingamajigUpdatedAction extends BaseAction {
  thingamajig: Thingamajig;

  constructor(thingamajig: Thingamajig) {
    super();
    this.thingamajig = thingamajig;
  }
}
