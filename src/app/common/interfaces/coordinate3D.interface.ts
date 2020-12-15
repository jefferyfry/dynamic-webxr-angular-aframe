/**
 * The location to place the asset. Overrides the asset location.
 *
 * A coordinate in 3D space relative to the user's location at 0,0,0.
 */
export interface Coordinate3D {

  /**
   * The x coordinate in space.
   */
  x: number| undefined;
  /**
   * The y coordinate in space.
   */
  y: number| undefined;
  /**
   * The z coordinate in space.
   */
  z: number| undefined;

}
