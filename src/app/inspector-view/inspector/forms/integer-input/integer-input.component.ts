import {Component, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NgControl, Validators} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

//https://github.com/angular/components/tree/master/src/components-examples/material-experimental/mdc-form-field/mdc-form-field-custom-control
@Component({
  selector: 'integer-input',
  templateUrl: './integer-input.component.html',
  styleUrls: ['./integer-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: IntegerInputComponent}],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class IntegerInputComponent implements ControlValueAccessor,MatFormFieldControl<number>,OnDestroy {
  formControl: FormControl;
  controlType = 'integer-input';

  private _placeholder: string;
  errorState = false;
  stateChanges = new Subject<void>();

  static nextId = 0;

  focused = false;

  private _required = false;
  private _disabled = false;
  private _min = Number.MIN_VALUE;
  private _max = Number.MAX_VALUE;
  describedBy = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  @Input('aria-describedby') userAriaDescribedBy: string;

  @HostBinding() id = `integer-form-field-${IntegerInputComponent.nextId++}`;

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.formControl = formBuilder.control(0, [Validators.required, Validators.minLength(1),Validators.pattern('^[-+]?\\d+$')]);

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return true;
  }

  @Input()
  get value(): number | null {
    let val = this.formControl.value;
    if(!val)
      return 0;
    return val;
  }
  set value(val: number | null) {
    if(val==null) return;
    if( val < this.min)
      val = this.min;
    else if( val > this.max)
      val = this.max;
    this.formControl.setValue(val);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.formControl.disable() : this.formControl.enable();
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input()
  get min() {
    return this._min;
  }

  set min(min) {
    this._min = min;
    this.stateChanges.next();
  }

  @Input()
  get max() {
    return this._max;
  }

  set max(max) {
    this._max = max;
    this.stateChanges.next();
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  get empty() {
    let val = this.formControl.value;
    return !val.value;
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.integer-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  writeValue(val:number | null): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.value);
  }

  selectAll($event){
    $event.target.select()
  }

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;

  incrementValue() {
    this.value++;
    this.onChange(this.value);
  }

  decrementValue() {
    this.value--;
    this.onChange(this.value);
  }
}


