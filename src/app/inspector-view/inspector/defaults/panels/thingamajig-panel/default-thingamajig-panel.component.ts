import {Component} from '@angular/core';
import {AbstractThingamajigPanelComponent} from "../../../panels/thingamajig-panel.component";
import {DefaultThingamajigModel} from "../../../../../ar-view/ar/defaults/models/default-thingamajig.model";

@Component({
  selector: 'default-thingamajig-panel',
  templateUrl: './default-thingamajig-panel.component.html',
  styleUrls: ['./default-thingamajig-panel.component.scss']
})
export class DefaultThingamajigPanelComponent extends AbstractThingamajigPanelComponent<DefaultThingamajigModel> {

  constructor() {
    super();
  }

  selectAll($event){
    $event.target.select()
  }

}
