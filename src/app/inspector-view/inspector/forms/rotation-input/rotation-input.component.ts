import {Component, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Self} from '@angular/core';
import {FormBuilder, FormGroup, ControlValueAccessor, Validators, NgControl} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

export class RotationParts {
  constructor(public pitch: number, public yaw: number, public roll: number) {}
}
//https://github.com/angular/components/tree/master/src/components-examples/material-experimental/mdc-form-field/mdc-form-field-custom-control
@Component({
  selector: 'rotation-input',
  templateUrl: './rotation-input.component.html',
  styleUrls: ['./rotation-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: RotationInputComponent}],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class RotationInputComponent implements ControlValueAccessor,MatFormFieldControl<RotationParts>,OnDestroy {
  parts: FormGroup;
  controlType = 'rotation-input';

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

  @HostBinding() id = `rotation-form-field-${RotationInputComponent.nextId++}`;

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      pitch: [0, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+$')]],
      yaw: [0, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+$')]],
      roll: [0, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+$')]],
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
  get value(): RotationParts | null {
    let val = this.parts.value;
    if(!val.pitch)
      val.pitch = 0;
    if(!val.yaw)
      val.yaw = 0;
    if(!val.roll)
      val.roll = 0;
    return new RotationParts(val.pitch, val.yaw, val.roll);
  }
  set value(val: RotationParts | null) {
    if(val==null) return;
    this.parts.setValue({pitch: val.pitch,yaw: val.yaw, roll: val.roll});
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
    return !val.pitch && !val.yaw && !val.roll;
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.rotation-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent) {
    //does nothing
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  writeValue(val:RotationParts | null): void {
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

  incrementPitch() {
    this.parts.value.pitch = this.parts.value.pitch + 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  decrementPitch() {
    this.parts.value.pitch = this.parts.value.pitch - 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  incrementYaw() {
    this.parts.value.yaw = this.parts.value.yaw + 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  decrementYaw() {
    this.parts.value.yaw = this.parts.value.yaw - 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  incrementRoll() {
    this.parts.value.roll = this.parts.value.roll + 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }

  decrementRoll() {
    this.parts.value.roll = this.parts.value.pitch - 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
  }
}


