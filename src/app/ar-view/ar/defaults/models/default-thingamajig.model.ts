import {ThingamajigModel} from "../../models/thingamajig.model";
import {Coordinate3D} from "../../../../common/interfaces/coordinate3D.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";

export class DefaultThingamajigModel extends ThingamajigModel {

  constructor(position?:Coordinate3D) {
    super("default", "[DefaultThingamajigModel]");
    if(position) this.position = position;
    this.name = this.value;
  }

  //value
  get value(): string {
    return super.value;
  }

  set value(value: string) {
    super.value = value;
    this.name = value;
  }
}
