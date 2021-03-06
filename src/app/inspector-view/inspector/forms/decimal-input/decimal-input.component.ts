import {Component, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NgControl, Validators} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

//https://github.com/angular/components/tree/master/src/components-examples/material-experimental/mdc-form-field/mdc-form-field-custom-control
@Component({
  selector: 'decimal-input',
  templateUrl: './decimal-input.component.html',
  styleUrls: ['./decimal-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: DecimalInputComponent}],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class DecimalInputComponent implements ControlValueAccessor,MatFormFieldControl<number>,OnDestroy {
  formControl: FormControl;
  controlType = 'decimal-input';

  private _placeholder: string;
  errorState = false;
  stateChanges = new Subject<void>();

  static nextId = 0;

  focused = false;

  private _required = false;
  private _disabled = false;
  private _decimals = 2;
  private _min = Number.MIN_VALUE;
  private _max = Number.MAX_VALUE;
  describedBy = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  @Input('aria-describedby') userAriaDescribedBy: string;

  @HostBinding() id = `decimal-form-field-${DecimalInputComponent.nextId++}`;

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.formControl = formBuilder.control(0, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+\\.?\\d{2}$'),Validators.min(0.05)]);

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
  get decimals() {
    return this._decimals;
  }

  set decimals(decimals) {
    this._decimals = decimals;
    this.stateChanges.next();
  }

  get formatScale():string {
    return '1.'+this.decimals+'-'+this.decimals;
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
      .querySelector('.decimal-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent) {
    //does nothing
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

  selectAll($event){
    $event.target.select()
  }

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;

  incrementValue() {
    this.value = this.value + 1/Math.pow(10,this.decimals);
    this.onChange(this.value);
  }

  decrementValue() {
    this.value = this.value - 1/Math.pow(10,this.decimals);
    this.onChange(this.value);
  }
}


