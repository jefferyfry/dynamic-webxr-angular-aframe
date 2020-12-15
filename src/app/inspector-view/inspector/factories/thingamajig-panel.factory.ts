import {ComponentRef, ViewContainerRef} from "@angular/core";
import {BaseAction} from "../actions/base.action";
import {Thingamajig} from "../../../common/interfaces/thingamajig.interface";
import {AbstractPanelFactory} from "./abstract-panel.factory";
import {AbstractThingamajigPanelComponent} from "../panels/thingamajig-panel.component";

export abstract class AbstractThingamajigPanelFactory<T extends AbstractThingamajigPanelComponent<Thingamajig>> extends AbstractPanelFactory {
  abstract generateWidget(thingamajigModel: Thingamajig, panelHost: ViewContainerRef, actionCallback: (action:BaseAction)=>void): ComponentRef<T>;
}
