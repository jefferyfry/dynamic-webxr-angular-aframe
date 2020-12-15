import {ID} from "../types/id.type";
import {Coordinate3D} from "./coordinate3D.interface";
import {Rotation} from "./rotation.interface";
import {Observable} from "rxjs";
import {Scale3D} from "./scale3D.interface";

/**
 * This thingamajig to be placed at a location in 3D space.
 */
export interface Thingamajig {


  /**
   * This is a unique ID.
   */
  id: ID;


  /**
   * This is the unique name to be referenced in the guide.
   */
  name: string;

  /**
   * This is the text value.
   */
  value: string;

  /**
   * The font.
   */
  font: string;

  align: string;

  fontColor: string;

  /**
   * glb
   */
  src: string;

  position: Coordinate3D | undefined;

  rotation: Rotation | undefined;

  scale: Scale3D | undefined;

  getType():string;

  getNameChanges(): Observable<string>;

  getDistinctNameChanges(): Observable<string>

  getValueChanges(): Observable<string>;

  getDistinctValueChanges(): Observable<string>;

  getPositionChanges(): Observable<Coordinate3D>;

  getDistinctPositionChanges(): Observable<Coordinate3D>;

  getRotationChanges(): Observable<Rotation>;

  getDistinctRotationChanges(): Observable<Rotation>;

  getScaleChanges(): Observable<Scale3D>;

  getDistinctScaleChanges(): Observable<Scale3D>;

  getFontChanges(): Observable<string>;

  getDistinctFontChanges(): Observable<string>;

  getFontColorChanges(): Observable<string>;

  getDistinctFontColorChanges(): Observable<string>;

  getAlignChanges(): Observable<string>;

  getDistinctAlignChanges(): Observable<string>;

  getSrcChanges(): Observable<string>;

  getDistinctSrcChanges(): Observable<string>;


}
