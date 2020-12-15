import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Renderer2, ViewContainerRef} from "@angular/core";
import {BaseAction} from "../../actions/base.action";
import {DefaultThingamajigPanelComponent} from "../panels/thingamajig-panel/default-thingamajig-panel.component";
import {DefaultThingamajigModel} from "../../../../ar-view/ar/defaults/models/default-thingamajig.model";
import {AbstractThingamajigPanelFactory} from "../../factories/thingamajig-panel.factory";

export class DefaultThingamajigPanelFactory extends AbstractThingamajigPanelFactory<DefaultThingamajigPanelComponent> {
  constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer2) {
    super('default');
  }

  generateWidget(thingamajigModel: DefaultThingamajigModel, panelHost: ViewContainerRef, actionCallback: (action:BaseAction)=>void): ComponentRef<DefaultThingamajigPanelComponent> {
    const componentRef = panelHost.createComponent(this.getComponentFactory());
    componentRef.instance.model = thingamajigModel;

    componentRef.instance.actionCallback = actionCallback;

    return componentRef;
  }

  getComponentFactory(): ComponentFactory<DefaultThingamajigPanelComponent> {
    return this.resolver.resolveComponentFactory(DefaultThingamajigPanelComponent);
  }
}
