import { Component, OnInit, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  regform: FormGroup;
  isSameAsPermanent: boolean = false;
  formSubmitted: boolean = false;   
  date = new Date();
  formattedDate = this.date.toISOString().slice(0, 10);  

  constructor(private fb: FormBuilder, private el: ElementRef) {}

  ngOnInit() {
    this.initRegistrationform();
  }

  initRegistrationform() {
    this.regform = this.fb.group({
      First_name: ['', Validators.required],
      Last_name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      DOB: ['', Validators.required],
      Ph_num: ['', Validators.required],
      Gender: ['male', Validators.required],
      Permanent_address: this.fb.group({
        Street: ['', Validators.required],
        Country: ['', Validators.required],
        City: ['', Validators.required],
        Region: ['', Validators.required],
        Postal_code: ['', Validators.required],
      }),
      Communication_address: this.fb.group({
        Street: ['', Validators.required],
        Country: ['', Validators.required],
        City: ['', Validators.required],
        Region: ['', Validators.required],
        Postal_code: ['', Validators.required],
      }),
      skills: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  resetPermanentcity() { this.regform.get(['Permanent_address', 'City']).setValue(''); }  

  resetCommunicationcity() { this.regform.get(['Communication_address', 'City']).setValue(''); } 

  resetAddress() {
    this.isSameAsPermanent = !this.isSameAsPermanent;
    if (this.regform.get(['Communication_address'])) {
      this.regform.get(['Communication_address']).reset();
    }
    this.regform.get(['Communication_address', 'Country']).setValue('');
  }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement =
      this.el.nativeElement.querySelector('form .ng-invalid');
    firstInvalidControl.focus();     //without smooth behavior
  }

  get skills() {
    return this.regform.get('skills') as FormArray;
  }

  addSKill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  isDisable(): boolean {                                              
    return this.skills.length === 1;
  }

  delete(index: number) {
    if (!this.isDisable()) {
      this.skills.removeAt(index);
    }
  }

  onSubmit() {
    const isFormSubmitted = this.formSubmitted || (this.formSubmitted = true);
    if (this.isSameAsPermanent) {
      const addr = this.regform.get('Permanent_address')?.value;
      this.regform.controls['Communication_address'].setValue({
        Street: addr.Street,
        Country: addr.Country,
        City: addr.City,
        Region: addr.Region,
        Postal_code: addr.Postal_code,
      });
    }
    if (this.regform.valid) {
      if (this.regform.get('isSameAsPermanent')) {
        this.regform.removeControl('isSameAsPermanent');
      }
      this.regform.addControl(
        'isSameAsPermanent',
        new FormControl(this.isSameAsPermanent));
      console.log(this.regform.value);}
    else if (this.regform.invalid) {
      if (isFormSubmitted) {
        this.regform.markAllAsTouched();
        this.scrollToFirstInvalidControl();}}
  }
}
