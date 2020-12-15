import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Renderer2,
  RendererFactory2,
  ViewContainerRef
} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {AbstractThingamajigFactory} from "../factories/thingamajig.factory";
import {ArModel} from "../models/ar.model";
import {ArModule} from "../ar.module";
import {ThingamajigModel} from "../models/thingamajig.model";
import {BaseEntity} from "../../../common-ui/base.entity";
import {delay, filter, take} from "rxjs/operators";
import {DefaultThingamajigFactory} from "../defaults/factories/default-thingamajig.factory";
import {AbstractEntityComponent} from "../components/abstract-entity.component";

@Injectable({providedIn: ArModule})
export class ArEngine {
  private renderer: Renderer2;
  private thingamajigFactories: { [s: string]: AbstractThingamajigFactory };
  private canvas$: BehaviorSubject<Element>;

  arModel: ArModel;

  constructor(private resolver: ComponentFactoryResolver, private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.thingamajigFactories = {};
    this.canvas$ = new BehaviorSubject<Element>(null);
  }

  createAr() {
    this.arModel = new ArModel(this);
    return this.arModel;
  }

  registerDefaultFactories() {
    this.registerThingamajigFactory(new DefaultThingamajigFactory(this.resolver, this.renderer));
  }

  /** Thingamajigs **/
  registerThingamajigFactory(thingamajigFactory: AbstractThingamajigFactory) {
    this.thingamajigFactories[thingamajigFactory.type] = thingamajigFactory;
  }

  getThingamajigFactories(): { [s: string]: AbstractThingamajigFactory } {
    return this.thingamajigFactories;
  }

  getThingamajigFactory(type: string): AbstractThingamajigFactory {
    if (this.thingamajigFactories[type]) {
      return this.thingamajigFactories[type];
    }
    throw new Error(`cannot find factory for thingamajig of type: [${type}]`);
  }

  getFactoryForThingamajig(model: ThingamajigModel): AbstractThingamajigFactory | null {
    return this.getThingamajigFactory(model.getType());
  }

  generateWidgetForThingamajig(thingamajig: ThingamajigModel, thingamajigHost: ViewContainerRef): ComponentRef<AbstractEntityComponent> | null {
    const thingamajigFactory = this.getFactoryForThingamajig(thingamajig);
    if (!thingamajigFactory) {
      throw new Error(`Cannot find widget factory for thingamajig: ${thingamajig.getType()}`);
    }
    return thingamajigFactory.generateWidget(thingamajig, thingamajigHost);
  }

  setCanvas(canvas: Element) {
    this.canvas$.next(canvas);
  }

  getRelativeMousePoint(event: MouseEvent): { x: number; y: number } {
    const point = this.getRelativePoint(event.clientX, event.clientY);
    return {
      x: (point.x - this.arModel.getOffsetX()) / (this.arModel.getZoomLevel() / 100.0),
      y: (point.y - this.arModel.getOffsetY()) / (this.arModel.getZoomLevel() / 100.0)
    };
  }

  getRelativePoint(x: number, y: number) {
    const canvasRect = this.canvas$.getValue().getBoundingClientRect();
    return {x: x - canvasRect.left, y: y - canvasRect.top};
  }

  getArModel() {
    return this.arModel;
  }

  isModelLocked(model: BaseEntity) {
    if (this.arModel.getLocked()) {
      return true;
    }

    return model.getLocked();
  }

  /**
   * auto arrange the graph
   */
  autoArrange() {
  }

  /**
   * fit the canvas zoom levels to the elements contained.
   * @param additionalZoomFactor allow for further zooming out to make sure edges doesn't cut
   */
  zoomToFit(additionalZoomFactor: number = 0.005) {
    this.canvas$
      .pipe(
        filter(Boolean),
        take(1),
        delay(0)
      )
      .subscribe((canvas: HTMLElement) => {
        const xFactor = canvas.clientWidth / canvas.scrollWidth;
        const yFactor = canvas.clientHeight / canvas.scrollHeight;
        const zoomFactor = xFactor < yFactor ? xFactor : yFactor;

        this.arModel.setZoomLevel(this.arModel.getZoomLevel() * (zoomFactor - additionalZoomFactor));
        this.arModel.setOffset(0, 0);
      });
  }

}
