import {Component, HostBinding, OnInit} from "@angular/core";
import {AbstractPrimitiveModel} from "../models/abstract-primitive.model";

@Component({
  template: ''
})
export abstract class AbstractEntityComponent implements OnInit {

  model: AbstractPrimitiveModel;

  @HostBinding('attr.position') private attrPosition = '0 5 -4';
  @HostBinding('attr.rotation') private attrRotation = '0 0 0';
  @HostBinding('attr.scale') private attrScale = '1 1 1';

  ngOnInit() {
    this.model.getDistinctPositionChanges().subscribe( position => {
      this.attrPosition = position.x + " " + position.y + " " + position.z;
    });
    this.model.getDistinctRotationChanges().subscribe( rotation => {
      this.attrRotation = rotation.pitch + " " + rotation.yaw + " " + rotation.roll;
    });
    this.model.getDistinctScaleChanges().subscribe( scale => {
      this.attrScale = scale.x + " " + scale.y + " " + scale.z;
    });
  }
}
