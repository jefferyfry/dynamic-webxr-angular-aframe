import {ComponentFactoryResolver, ComponentRef, Injectable, Renderer2, RendererFactory2, ViewContainerRef} from "@angular/core";
import {InspectorModule} from "../inspector.module";
import {InspectorModel} from "../models/inspector.model";
import {BaseAction} from "../actions/base.action";
import {Thingamajig} from "../../../common/interfaces/thingamajig.interface";
import {AbstractThingamajigPanelFactory} from "../factories/thingamajig-panel.factory";
import {AbstractThingamajigPanelComponent} from "../panels/thingamajig-panel.component";
import {DefaultThingamajigPanelFactory} from "../defaults/factories/default-thingamajig-panel.factory";

@Injectable({providedIn: InspectorModule})
export class InspectorEngine {
  private readonly renderer: Renderer2;
  private readonly thingamajigPanelFactories: { [s: string]: AbstractThingamajigPanelFactory<AbstractThingamajigPanelComponent<Thingamajig>> };

  inspectorModel: InspectorModel;

  constructor(private resolver: ComponentFactoryResolver, private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.thingamajigPanelFactories = {};
  }

  createInspector() {
    this.inspectorModel = new InspectorModel(this);
    return this.inspectorModel;
  }

  registerDefaultFactories() {
    this.registerThingamajigPanelFactory(new DefaultThingamajigPanelFactory(this.resolver, this.renderer));
  }

  // thingamajig
  registerThingamajigPanelFactory(thingamajigPanelFactory: AbstractThingamajigPanelFactory<AbstractThingamajigPanelComponent<Thingamajig>>) {
    this.thingamajigPanelFactories[thingamajigPanelFactory.type] = thingamajigPanelFactory;
  }

  getThingamajigPanelFactories(): { [s: string]: AbstractThingamajigPanelFactory<AbstractThingamajigPanelComponent<Thingamajig>> } {
    return this.thingamajigPanelFactories;
  }

  getThingamajigPanelFactory(type: string): AbstractThingamajigPanelFactory<AbstractThingamajigPanelComponent<Thingamajig>> {
    if (this.thingamajigPanelFactories[type]) {
      return this.thingamajigPanelFactories[type];
    }
    throw new Error(`cannot find factory for type: [${type}]`);
  }

  getFactoryForThingamajigPanel(thingamajig: Thingamajig): AbstractThingamajigPanelFactory<AbstractThingamajigPanelComponent<Thingamajig>> | null {
    return this.getThingamajigPanelFactory(thingamajig.getType());
  }

  generatePanelForThingamajig(thingamajig: Thingamajig, thingamajigHost: ViewContainerRef, actionCallback: (action:BaseAction)=>void): ComponentRef<AbstractThingamajigPanelComponent<Thingamajig>> | null {
    const thingamajigPanelFactory = this.getFactoryForThingamajigPanel(thingamajig);
    if (!thingamajigPanelFactory) {
      throw new Error(`Cannot find widget factory for thingamajig: ${thingamajig.getType()}`);
    }
    return thingamajigPanelFactory.generateWidget(thingamajig, thingamajigHost, actionCallback);
  }
}
