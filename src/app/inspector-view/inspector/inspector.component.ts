import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {InspectorModel} from "./models/inspector.model";
import {takeUntil} from "rxjs/operators";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {BaseAction} from "./actions/base.action";
import {Thingamajig} from "../../common/interfaces/thingamajig.interface";

@Component({
  selector: 'app-inspector',
  templateUrl: 'inspector.component.html',
  styleUrls: ['inspector.component.scss']
})
export class InspectorComponent implements OnInit, OnDestroy {
  @Input() model: InspectorModel;

  @Output() actionFired: EventEmitter<BaseAction> = new EventEmitter();

  @ViewChild('thingamajigsLayer', {read: ViewContainerRef, static: true}) thingamajigsGroup: ViewContainerRef;

  private thingamajigs$: Observable<Map< string, Thingamajig >>;
  private thingamajigsRendered$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor() {
  }

  // TODO: handle destruction of container, resetting all observables to avoid memory leaks!
  ngOnInit() {
    if(this.model){
      this.thingamajigs$ = this.model.thingamajigs$;

      this.thingamajigs$.pipe(takeUntil(this.destroyed$)).subscribe(thingamajigs => {
        this.thingamajigsRendered$.next(false);
        this.thingamajigsGroup.clear();
        thingamajigs.forEach((thingamajig:Thingamajig, id:string) => {
          this.model.getInspectorEngine().generatePanelForThingamajig(thingamajig, this.thingamajigsGroup, (action) =>{this.fireAction(action)});
        })
        this.thingamajigsRendered$.next(true);
      });
    }
  }

  fireAction(action: BaseAction) {
    this.actionFired.emit(action);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
