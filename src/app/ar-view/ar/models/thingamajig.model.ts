import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {Thingamajig} from "../../../common/interfaces/thingamajig.interface";
import {UID} from "../../../common/utils";
import {AbstractPrimitiveModel} from "./abstract-primitive.model";

export abstract class ThingamajigModel extends AbstractPrimitiveModel implements Thingamajig {

  private _value: string = "Spiderman";
  private valueSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._value);
  value$: Observable<string> = this.valueSubject.asObservable();

  private _align: string = "center"; //(left, center, right)
  private alignSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._align);
  align$: Observable<string> = this.alignSubject.asObservable();

  private _fontColor: string = "black";
  private fontColorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._fontColor);
  fontColor$: Observable<string> = this.fontColorSubject.asObservable();

  private _font: string = "roboto";
  private fontSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._font);
  font$: Observable<string> = this.fontSubject.asObservable();

  private _src: string = "assets/3d/normal-spidey.glb";
  private srcSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._src);
  src$: Observable<string> = this.srcSubject.asObservable();
  

  constructor(
    type: string,
    logPrefix: string
  ) {
    super(type, 'thingamajig-'+UID(), logPrefix);
  }

  //value
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.valueSubject.next(value);
  }

  getValueChanges(): Observable<string> {
    return this.valueSubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctValueChanges(): Observable<string> {
    return this.valueSubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }

  //align
  get align(): string {
    return this._align;
  }

  set align(align: string) {
    this._align = align;
    this.alignSubject.next(align);
  }

  getAlignChanges(): Observable<string> {
    return this.alignSubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctAlignChanges(): Observable<string> {
    return this.alignSubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }

  //src
  get src(): string {
    return this._src;
  }

  set src(src: string) {
    this._src = src;
    this.srcSubject.next(src);
  }

  getSrcChanges(): Observable<string> {
    return this.srcSubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctSrcChanges(): Observable<string> {
    return this.srcSubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }

  //fontColor
  get fontColor(): string {
    return this._fontColor;
  }

  set fontColor(fontColor: string) {
    this._fontColor = fontColor;
    this.fontColorSubject.next(fontColor);
  }

  getFontColorChanges(): Observable<string> {
    return this.fontColorSubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctFontColorChanges(): Observable<string> {
    return this.fontColorSubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }

  //font
  get font(): string {
    return this._font;
  }

  set font(font: string) {
    this._font = font;
    this.fontSubject.next(font);
  }

  getFontChanges(): Observable<string> {
    return this.fontSubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctFontChanges(): Observable<string> {
    return this.fontSubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }
}
