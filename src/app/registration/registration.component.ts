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
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['male', Validators.required],
      permanent_address: this.fb.group({
        street: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        region: ['', Validators.required],
        postal_code: ['', Validators.required],
      }),
      communication_address: this.fb.group({
        street: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        region: ['', Validators.required],
        postal_code: ['', Validators.required],
      }),
      skills: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  resetPermanentCity() { this.regform.get(['permanent_address', 'city']).setValue(''); }  

  resetCommunicationCity() { this.regform.get(['communication_address', 'city']).setValue(''); } 

  resetAddress() {
    this.isSameAsPermanent = !this.isSameAsPermanent;
    if (this.regform.get(['communication_address'])) {
      this.regform.get(['communication_address']).reset();
    }
    this.regform.get(['communication_address', 'country']).setValue('');
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
      const addr = this.regform.get('permanent_address')?.value;
      this.regform.controls['communication_address'].setValue({
        street: addr.street,
        country: addr.country,
        city: addr.city,
        region: addr.region,
        postal_code: addr.postal_code,
      });
    }
    if (this.regform.valid) {
      if (this.regform.get('isSameAsPermanent')) {
        this.regform.removeControl('isSameAsPermanent');
      }
      this.regform.addControl(
        'isSameAsPermanent',
        new FormControl(this.isSameAsPermanent));
          this.getFormBody();
        }
    else if (this.regform.invalid) {
      if (isFormSubmitted) {
        this.regform.markAllAsTouched();
        this.scrollToFirstInvalidControl();}}
  }

  getFormBody(){
    const frmValue = this.regform.value;
    const myObject={
      First_name:frmValue.first_name,
      Last_Name:frmValue.last_name,
      Email:frmValue.email,
      DOB:frmValue.date_of_birth,
      Ph_num:frmValue.phone,
      Gender:frmValue.gender,
      Permanent_address:{
        Street:frmValue.permanent_address.street,
        Country:frmValue.permanent_address.country,
        City:frmValue.permanent_address.city,
        Region:frmValue.permanent_address.region,
        Postal_Code:frmValue.permanent_address.postal_code,
      },
      isSameAsPermanent:this.regform.get('isSameAsPermanent').value,
      Communication_address:{
        Street:frmValue.communication_address.street,
        Country:frmValue.communication_address.country,
        City:frmValue.communication_address.city,
        Region:frmValue.communication_address.region,
        Postal_Code:frmValue.communication_address.postal_code,
      },
      Skills:frmValue.skills
    }
    console.log(myObject);
  }
}
