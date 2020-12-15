import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Renderer2, ViewContainerRef} from "@angular/core";
import {AbstractThingamajigFactory} from "../../factories/thingamajig.factory";
import {ThingamajigModel} from "../../models/thingamajig.model";
import {DefaultThingamajigComponent} from "../components/default-thingamajig/default-thingamajig.component";

export class DefaultThingamajigFactory extends AbstractThingamajigFactory {
  constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer2) {
    super('default');
  }

  generateWidget(model: ThingamajigModel, host: ViewContainerRef): ComponentRef<DefaultThingamajigComponent> {
    const componentRef = host.createComponent(this.getComponentFactory());

    componentRef.instance.model = model;

    // attach coordinates and default positional behaviour to the generated component host
    const rootNode = componentRef.location.nativeElement;

    this.renderer.setAttribute(rootNode, 'data-id', model.id);

    model.selectionChanges().subscribe(e => {
      e.isSelected ? this.renderer.addClass(rootNode, 'selected') : this.renderer.removeClass(rootNode, 'selected');
    });

    model.onEntityDestroy().subscribe((/** e */) => {
      componentRef.destroy();
    });

    // assign all passed properties to node initialization.
    Object.entries(model).forEach(([key, value]) => {
      componentRef.instance[key] = value;
    });

    return componentRef;
  }

  getComponentFactory(): ComponentFactory<DefaultThingamajigComponent> {
    return this.resolver.resolveComponentFactory(DefaultThingamajigComponent);
  }
}
