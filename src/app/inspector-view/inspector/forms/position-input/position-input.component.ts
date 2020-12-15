import {Component, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Self} from '@angular/core';
import {FormBuilder, FormGroup, ControlValueAccessor, Validators, NgControl} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

export class PositionParts {
  constructor(public x: number, public y: number, public z: number) {}
}
//https://github.com/angular/components/tree/master/src/components-examples/material-experimental/mdc-form-field/mdc-form-field-custom-control
@Component({
  selector: 'position-input',
  templateUrl: './position-input.component.html',
  styleUrls: ['./position-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: PositionInputComponent}],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class PositionInputComponent implements ControlValueAccessor,MatFormFieldControl<PositionParts>,OnDestroy {
  parts: FormGroup;
  controlType = 'position-input';

  private _placeholder: string;
  errorState = false;
  stateChanges = new Subject<void>();

  static nextId = 0;

  focused = false;

  private _required = false;
  private _disabled = false;
  private _decimals = 2;
  describedBy = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  @Input('aria-describedby') userAriaDescribedBy: string;

  @HostBinding() id = `position-form-field-${PositionInputComponent.nextId++}`;

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      x: [0, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+$')]],
      y: [0, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+$')]],
      z: [0, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+$')]],
    });

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
  get value(): PositionParts | null {
    let val = this.parts.value;
    if(!val.x)
      val.x = 0;
    if(!val.y)
      val.y = 0;
    if(!val.z)
      val.z = 0;
    return new PositionParts(val.x, val.y, val.z);
  }
  set value(val: PositionParts | null) {
    if(val==null) return;
    this.parts.setValue({x: val.x,y: val.y, z: val.z});
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
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
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  get empty() {
    let val = this.parts.value;
    return !val.x && !val.y && !val.z;
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.position-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent) {
    //do nothing
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  writeValue(val:PositionParts | null): void {
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

  incrementX() {
    this.parts.value.x = this.parts.value.x + 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  decrementX() {
    this.parts.value.x = this.parts.value.x - 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  incrementY() {
    this.parts.value.y = this.parts.value.y + 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  decrementY() {
    this.parts.value.y = this.parts.value.y - 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  incrementZ() {
    this.parts.value.z = this.parts.value.z + 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  decrementZ() {
    this.parts.value.z = this.parts.value.z - 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }
}


