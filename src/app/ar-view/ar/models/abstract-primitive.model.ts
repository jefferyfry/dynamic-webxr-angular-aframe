import {BaseModel} from "../../../common-ui/models/base.model";
import {ArModel} from "./ar.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Coordinate3D} from "../../../common/interfaces/coordinate3D.interface";
import {Rotation} from "../../../common/interfaces/rotation.interface";
import {distinctUntilChanged, takeUntil} from "rxjs/operators";
import {Scale3D} from "../../../common/interfaces/scale3D.interface";

export abstract class AbstractPrimitiveModel extends BaseModel<ArModel> {

  marker: string | undefined;

  private _name: string = "";
  private nameSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._name);
  name$: Observable<string> = this.nameSubject.asObservable();

  private _position: Coordinate3D = {x: 0, y:5, z:5};
  private positionSubject: BehaviorSubject<Coordinate3D> = new BehaviorSubject<Coordinate3D>(this._position);
  position$: Observable<Coordinate3D> = this.positionSubject.asObservable();

  private _rotation: Rotation = {pitch: 0, yaw:20, roll:0};
  private rotationSubject: BehaviorSubject<Rotation> = new BehaviorSubject<Rotation>(this._rotation);
  rotation$: Observable<Rotation> = this.rotationSubject.asObservable();

  private _scale: Scale3D = {x: 1, y:1, z:1};
  private scaleSubject: BehaviorSubject<Scale3D> = new BehaviorSubject<Scale3D>(this._scale);
  scale$: Observable<Scale3D> = this.scaleSubject.asObservable();

  private _opacity: number = 1.0;
  private opacitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(this._opacity);
  opacity$: Observable<number> = this.opacitySubject.asObservable();

  constructor(
    type: string,
    id: string,
    logPrefix: string
  ) {
    super(type, id, logPrefix);
  }

  getMarker(): string {
    return this.marker;
  }

  setMarker(marker: string) {
    this.marker=marker;
  }

  //name
  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    this.nameSubject.next(name);
  }

  getNameChanges(): Observable<string> {
    return this.nameSubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctNameChanges(): Observable<string> {
    return this.nameSubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }

  //position
  get position(): Coordinate3D {
    return this._position;
  }

  set position({x, y, z}: Coordinate3D) {
    this._position = {x, y, z};
    this.positionSubject.next({x, y, z});
  }

  getPositionChanges(): Observable<Coordinate3D> {
    return this.positionSubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctPositionChanges(): Observable<Coordinate3D> {
    return this.positionSubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }

  //rotation
  get rotation(): Rotation {
    return this._rotation;
  }

  set rotation({pitch, yaw, roll}: Rotation) {
    this._rotation = {pitch, yaw, roll};
    this.rotationSubject.next({pitch, yaw, roll});
  }

  getRotationChanges(): Observable<Rotation> {
    return this.rotationSubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctRotationChanges(): Observable<Rotation> {
    return this.rotationSubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }

  //scale
  get scale(): Scale3D {
    return this._scale;
  }

  set scale({x, y, z}: Scale3D) {
    this._scale = {x, y, z};
    this.scaleSubject.next({x, y, z});
  }

  getScaleChanges(): Observable<Scale3D> {
    return this.scaleSubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctScaleChanges(): Observable<Scale3D> {
    return this.scaleSubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }

  //opacity
  get opacity(): number {
    return this._opacity;
  }

  set opacity(opacity: number) {
    this._opacity = opacity;
    this.opacitySubject.next(opacity);
  }

  getOpacityChanges(): Observable<number> {
    return this.opacitySubject.pipe(takeUntil(this.onEntityDestroy()));
  }

  getDistinctOpacityChanges(): Observable<number> {
    return this.opacitySubject.pipe(takeUntil(this.onEntityDestroy()), distinctUntilChanged());
  }

}
