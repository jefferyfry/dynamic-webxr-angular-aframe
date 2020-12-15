import {Component, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators} from "@angular/forms";
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {Subject} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

export class ScaleParts {
  constructor(public x: number, public y: number, public z: number) {}
}
//https://github.com/angular/components/tree/master/src/components-examples/material-experimental/mdc-form-field/mdc-form-field-custom-control
@Component({
  selector: 'scale-input',
  templateUrl: './scale-input.component.html',
  styleUrls: ['./scale-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ScaleInputComponent}],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class ScaleInputComponent implements ControlValueAccessor,MatFormFieldControl<ScaleParts>,OnDestroy {
  parts: FormGroup;
  controlType = 'scale-input';

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

  @HostBinding() id = `scale-form-field-${ScaleInputComponent.nextId++}`;

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      x: [1, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+\\.?\\d{2}$'),Validators.min(0.05)]],
      y: [1, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+\\.?\\d{2}$'),Validators.min(0.05)]],
      z: [1, [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern('^[-+]?\\d+\\.?\\d{2}$'),Validators.min(0.05)]],
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
  get value(): ScaleParts | null {
    let val = this.parts.value;
    if(!val.x)
      val.x = 1;
    if(!val.y)
      val.y = 1;
    if(!val.z)
      val.z = 1;
    return new ScaleParts(val.x, val.y, val.z);
  }
  set value(val: ScaleParts | null) {
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
      .querySelector('.scale-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent) {
    //does nothing
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  writeValue(val:ScaleParts | null): void {
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
    (this._elementRef.nativeElement.querySelector('#scaleX') as HTMLInputElement).select();
  }

  decrementX() {
    this.parts.value.x = this.parts.value.x - 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
    (this._elementRef.nativeElement.querySelector('#scaleX') as HTMLInputElement).select();
  }

  incrementY() {
    this.parts.value.y = this.parts.value.y + 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
    (this._elementRef.nativeElement.querySelector('#scaleY') as HTMLInputElement).select();
  }

  decrementY() {
    this.parts.value.y = this.parts.value.y - 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
    (this._elementRef.nativeElement.querySelector('#scaleY') as HTMLInputElement).select();
  }

  incrementZ() {
    this.parts.value.z = this.parts.value.z + 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
    (this._elementRef.nativeElement.querySelector('#scaleZ') as HTMLInputElement).select();
  }

  decrementZ() {
    this.parts.value.z = this.parts.value.z - 1/Math.pow(10,this.decimals);
    this.onChange(this.parts.value);
    (this._elementRef.nativeElement.querySelector('#scaleZ') as HTMLInputElement).select();
  }
}


