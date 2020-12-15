import {BaseEntity} from "../../../common-ui/base.entity";
import {InspectorEngine} from "../services/inspector-engine.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Thingamajig} from "../../../common/interfaces/thingamajig.interface";

export class InspectorModel extends BaseEntity {

  private thingamajigsSubject: BehaviorSubject<Map< string, Thingamajig >> = new BehaviorSubject(new Map< string, Thingamajig >());
  thingamajigs$: Observable<Map< string, Thingamajig >> = this.thingamajigsSubject.asObservable();

  constructor(private inspectorEngine: InspectorEngine, id?: string) {
    super(id);
  }

  addThingamajig(thingamajigs: Map<string,Thingamajig>) {
    this.thingamajigsSubject.next(thingamajigs);
  }

  clearAll() {
    this.thingamajigsSubject.next(new Map< string, Thingamajig >());
  }

  getInspectorEngine() {
    return this.inspectorEngine;
  }
}
