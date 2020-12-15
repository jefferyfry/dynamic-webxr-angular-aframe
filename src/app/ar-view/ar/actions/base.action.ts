export class BaseAction {
  mouseX: number;
  mouseY: number;
  ms: number;

  dimensions: {
    top: number;
    left: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
  };

  constructor(mouseX: number, mouseY: number) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.ms = new Date().getTime();
  }
}
