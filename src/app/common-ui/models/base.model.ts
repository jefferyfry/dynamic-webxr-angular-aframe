import {BaseEntity} from '../base.entity';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {SelectionEvent} from '../../common/interfaces/event.interface';

export class BaseModel<X extends BaseEntity = BaseEntity> extends BaseEntity {
  private readonly type: string;
  private readonly parentSubject: BehaviorSubject<X> = new BehaviorSubject(null);
  private readonly selected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selected$: Observable<boolean> = this.selected.asObservable();

  constructor(type?: string, id?: string, logPrefix = '[Base]') {
    super(id, logPrefix);
    this.type = type;
  }

  getParent(): X {
    return this.parentSubject.getValue();
  }

  setParent(parent: X): void {
    this.parentSubject.next(parent);
  }

  getType(): string {
    return this.type;
  }

  getSelected(): boolean {
    return this.selected.getValue();
  }

  selectSelected(): Observable<boolean> {
    return this.selected$;
  }

  setSelected(selected: boolean = true) {
    this.selected.next(selected);
  }

  selectionChanges(): Observable<SelectionEvent> {
    return this.selected$.pipe(
      takeUntil(this.onEntityDestroy()),
      map(s => new SelectionEvent(this, s)),
      this.withLog('selectionChanges')
    );
  }

  getSelectedEntities(): BaseModel[] {
    return this.selected.value ? [this] : [];
  }
}
