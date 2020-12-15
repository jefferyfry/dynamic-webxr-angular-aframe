import {AbstractFactory} from "../../../common-ui/factories/abstract.factory";
import {ComponentRef, ViewContainerRef} from "@angular/core";
import {ThingamajigModel} from "../models/thingamajig.model";
import {AbstractEntityComponent} from "../components/abstract-entity.component";

export abstract class AbstractThingamajigFactory<T extends AbstractEntityComponent = AbstractEntityComponent> extends AbstractFactory {
  abstract generateWidget(model: ThingamajigModel, host: ViewContainerRef): ComponentRef<T>;
}
