import {Component, ElementRef, HostBinding, OnInit, Renderer2} from "@angular/core";
import {DefaultThingamajigModel} from "../../models/default-thingamajig.model";
import {AbstractEntityComponent} from "../../../components/abstract-entity.component";
import {THREE} from "aframe";

@Component({
  selector: "a-thingamajig",
  templateUrl: "./default-thingamajig.component.html",
  styleUrls: ["./default-thingamajig.component.scss"]
})
export class DefaultThingamajigComponent extends AbstractEntityComponent implements OnInit {

  @HostBinding("attr.value") private attrValue = "Text";
  @HostBinding("attr.font-color") private attrFontColor = "black";
  @HostBinding("attr.font") private attrFont = "roboto";
  @HostBinding("attr.align") private attrAlign = "center";
  @HostBinding("attr.src") private attrSrc = "assets/3d/normal-spidey.glb";


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    let model = <DefaultThingamajigModel> <unknown> this.model;
    model.getDistinctValueChanges().subscribe(val => {
      this.attrValue = val;
    });
    model.getDistinctFontColorChanges().subscribe(color => {
      this.attrFontColor = color;
    });
    model.getDistinctFontChanges().subscribe(font => {
      this.attrFont = font;
    });
    model.getDistinctAlignChanges().subscribe(align => {
      this.attrAlign = align;
    });
    model.getDistinctSrcChanges().subscribe(src => {
      this.attrSrc = src;
    });
  }
}
