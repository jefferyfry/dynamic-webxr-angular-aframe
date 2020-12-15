import {log as _log, LOG_LEVEL, UID, withLog as _withLog} from '../common/utils/tool-kit.util';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {BaseEvent, DestroyOptions, LockEvent} from '../common/interfaces/event.interface';
import {ID} from "../common/types/id.type";

export type BaseEntityType = 'thingamajig' ;

export class BaseEntity {
  private _id: ID;
  /**
   * a prefix to make logs more easier
   */
  private _logPrefix: string;
  private _destroyed: Subject<DestroyOptions> = new Subject();
  private _destroyed$: Observable<DestroyOptions> = this._destroyed.asObservable();
  private _locked: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _locked$: Observable<boolean> = this._locked.asObservable();

  constructor(id?: ID, logPrefix = '') {
    this._id = id || UID();
    this._logPrefix = `${logPrefix}`;
  }

  public get id(): ID {
    return this._id;
  }

  public set id(id: ID) {
    this._id = id;
  }

  log(message: string, ...args: any): void {
    _log(`${this._logPrefix} ${message}: `, LOG_LEVEL.LOG, ...args);
  }

  withLog(message: string, ...args: any): any {
    return _withLog(`${this._logPrefix} ${message}: `, LOG_LEVEL.LOG, ...args);
  }

  getLocked(): boolean {
    return this._locked.getValue();
  }

  setLocked(locked: boolean = true) {
    this._locked.next(locked);
  }

  // tslint:disable-next-line
  doClone(lookupTable: { [s: string]: any } = {}, clone: any) {
    /*noop*/
  }

  clone(lookupTable: { [s: string]: any } = {}) {
    // try and use an existing clone first
    if (lookupTable[this.id]) {
      return lookupTable[this.id];
    }
    const clone = {...this};
    clone.id = UID();
    // clone.clearListeners();
    lookupTable[this.id] = clone;

    this.doClone(lookupTable, clone);
    return clone;
  }

  public lockChanges(): Observable<LockEvent> {
    return this._locked$.pipe(
      takeUntil(this.onEntityDestroy()),
      map(locked => new LockEvent(this, locked)),
      this.withLog('lockChanges')
    );
  }

  public destroy(options?: DestroyOptions) {
    const defaultOptions: DestroyOptions = {
      emit: true,
      propagate: true,
      ...options
    };

    this.log('entity destroyed');
    this._destroyed.next(defaultOptions);
    this._destroyed.complete();
  }

  public onEntityDestroy(): Observable<BaseEvent<BaseEntity>> {
    return this._destroyed$.pipe(
      filter(opts => opts.emit),
      map(opts => new BaseEvent(this, opts))
    );
  }
}
