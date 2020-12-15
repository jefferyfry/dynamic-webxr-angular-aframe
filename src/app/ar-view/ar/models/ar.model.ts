import {BaseEntity, BaseEntityType} from "../../../common-ui/base.entity";
import {BehaviorSubject, Observable} from "rxjs";
import {ArEngine} from "../services/ar-engine.service";
import {ID} from "../../../common/types/id.type";
import {Thingamajig} from "../../../common/interfaces/thingamajig.interface";
import {ThingamajigModel} from "./thingamajig.model";
import {BaseModel} from "../../../common-ui/models/base.model";
import {flatMap, uniq} from 'lodash-es';

export class ArModel extends BaseEntity {

  private thingamajigsSubject: BehaviorSubject<Map< string, Thingamajig >> = new BehaviorSubject(new Map< string, Thingamajig >());
  thingamajigs$: Observable<Map< string, Thingamajig >> = this.thingamajigsSubject.asObservable();
  private clearSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  clear$: Observable<boolean> = this.clearSubject.asObservable();
  private zoomSubject: BehaviorSubject<number> = new BehaviorSubject(100);
  zoom$: Observable<number> = this.zoomSubject.asObservable();
  private offsetXSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  offsetX$: Observable<number> = this.offsetXSubject.asObservable();
  private offsetYSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  offsetY$: Observable<number> = this.offsetYSubject.asObservable();

  constructor(private arEngine: ArEngine, id?: string) {
    super(id);
  }

  /** Thingamajigs **/
  getThingamajigs(): Map< string, Thingamajig > {
    return this.thingamajigsSubject.getValue();
  }

  getThingamajig(id: ID): Thingamajig | null {
    return this.thingamajigsSubject.getValue()[id];
  }

  addThingamajig(thingamajig: Thingamajig): Thingamajig {
    this.thingamajigsSubject.next({...this.thingamajigsSubject.value, [thingamajig.id]: thingamajig});
    return thingamajig;
  }

  updateThingamajig(thingamajig: Thingamajig): Thingamajig {
    this.thingamajigsSubject.next({...this.thingamajigsSubject.value, [thingamajig.id]: thingamajig});
    return thingamajig;
  }

  deleteThingamajig(thingamajigOrId: Thingamajig | string): void {
    const thingamajigID: ID = typeof thingamajigOrId === 'string' ? thingamajigOrId : thingamajigOrId.id;
    const updThingamajigs = {...this.thingamajigsSubject.value};
    delete updThingamajigs[thingamajigID];
    this.thingamajigsSubject.next(updThingamajigs);
  }

  clearAll(){
    this.thingamajigsSubject.next({ } as Map<string, Thingamajig>);
  }

  setOffset(x: number, y: number) {
    this.offsetXSubject.next(x);
    this.offsetYSubject.next(y);
  }

  setOffsetX(x: number) {
    this.offsetXSubject.next(x);
  }

  getOffsetX(): number {
    return this.offsetXSubject.getValue();
  }

  setOffsetY(y: number) {
    this.offsetYSubject.next(y);
  }

  getOffsetY(): number {
    return this.offsetYSubject.getValue();
  }

  setZoomLevel(z: number) {
    this.zoomSubject.next(z);
  }

  getZoomLevel(): number {
    return this.zoomSubject.getValue();
  }

  getArEngine(): ArEngine {
    return this.arEngine;
  }

  clearSelection(ignore: BaseModel | null = null) {
    this.getSelectedItems().forEach(element => {
      if (ignore && ignore.id === element.id) {
        return;
      }
      element.setSelected(false);
    });
  }

  getSelectedItems(...filters: BaseEntityType[]): BaseModel[] {
    if (!Array.isArray(filters)) {
      filters = [filters];
    }
    let items = [];

    items = items.concat(
      flatMap(this.thingamajigsSubject.getValue(), item => {
        return item.getSelectedEntities();
      })
    );

    items = uniq(items);

    if (filters.length > 0) {
      items = uniq(items).filter((item: BaseModel) => {
        if (filters.includes('thingamajig') && item instanceof ThingamajigModel) {
          return true;
        }
        return false;
      });
    }

    return items;
  }

  addAll(...models: BaseModel[]) {
    models.forEach(model => {
      if (model instanceof ThingamajigModel) {
        this.addThingamajig(model);
      }
    });
    return models;
  }
}
