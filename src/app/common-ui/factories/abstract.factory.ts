export abstract class AbstractFactory {
  protected _type: string;

  constructor(name: string) {
    this._type = name;
  }

  get type(): string {
    return this._type;
  }
}
