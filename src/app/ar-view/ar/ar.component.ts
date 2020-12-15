import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ArModel} from "./models/ar.model";
import {BaseAction} from "./actions/base.action";
import {Thingamajig} from "../../common/interfaces/thingamajig.interface";
import {THREE} from "aframe";

@Component({
  selector: 'app-ar',
  templateUrl: 'ar.component.html',
  styleUrls: ['ar.component.scss']
})
export class ArComponent implements OnInit, OnDestroy {
  @Input() model: ArModel;
  @Input() allowCanvasZoom = true;
  @Input() allowCanvasTranslation = true;
  @Input() inverseZoom = true;
  @Input() allowLooseLinks = true;

  @Output() actionStartedFiring: EventEmitter<BaseAction> = new EventEmitter();
  @Output() actionStillFiring: EventEmitter<BaseAction> = new EventEmitter();
  @Output() actionStoppedFiring: EventEmitter<BaseAction> = new EventEmitter();

  @ViewChild('thingamajigsLayer', {read: ViewContainerRef, static: true}) thingamajigsLayer: ViewContainerRef;
  @ViewChild('canvas', {read: ElementRef, static: true}) canvas: ElementRef;

  private thingamajigs$: Observable<Map< string, Thingamajig >>;
  private thingamajigsRendered$: BehaviorSubject<boolean>;
  private action$: BehaviorSubject<BaseAction> = new BehaviorSubject(null);
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  private mouseUpListener = () => {
  }
  private mouseMoveListener = () => {
  }

  constructor(private renderer: Renderer2) {
  }

  // TODO: handle destruction of container, resetting all observables to avoid memory leaks!
  ngOnInit() {
    if (this.model) {
      this.model.getArEngine().setCanvas(this.canvas.nativeElement);
      this.thingamajigs$ = this.model.thingamajigs$;
      this.thingamajigsRendered$ = new BehaviorSubject(false);

      this.thingamajigs$.pipe(takeUntil(this.destroyed$)).subscribe(thingamajigs => {
        this.thingamajigsRendered$.next(false);
        this.thingamajigsLayer.clear();
        Object.values(thingamajigs).forEach(thingamajig => {
          this.model.getArEngine().generateWidgetForThingamajig(thingamajig, this.thingamajigsLayer);
        });
        this.thingamajigsRendered$.next(true);
      });

      this.registerAxisComponent();
      this.registerThingamajigCardPrimitive();
    }
  }

  private registerAxisComponent(){
    AFRAME.registerComponent('axis', {
      init: function() {
        let entity = this.el.object3D;
        entity.add(new THREE.ArrowHelper( new THREE.Vector3( 1,0,0 ), new THREE.Vector3( 0,0,0 ), 0.25, 0x7F2020, 0.05, 0.05 ));
        entity.add(new THREE.ArrowHelper( new THREE.Vector3( 0,1,0 ), new THREE.Vector3( 0,0,0 ), 0.25, 0x207F20, 0.05, 0.05 ));
        entity.add(new THREE.ArrowHelper( new THREE.Vector3( 0,0,1 ), new THREE.Vector3( 0,0,0 ), 0.25, 0x20207F, 0.05, 0.05 ));
      }
    });
  }

  private registerThingamajigCardPrimitive(){
    AFRAME.registerPrimitive("a-thingamajig", {
      defaultComponents: {
        text:{},
        "gltf-model": "assets/3d/normal-spidey.glb",
        axis:{}
      },
      mappings: {
        font: "text.font",
        "font-color": "text.color",
        value: "text.value",
        align: "text.align",
        src: "gltf-model"
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
