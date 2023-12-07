import {Component,OnInit,ElementRef,Output,EventEmitter,} from '@angular/core';
import {FormBuilder,FormArray,Validators,FormGroup,FormControl,} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  regform: FormGroup;
  isSameAsPermanent: boolean = false; //checking for Same as Permanent Address check button
  date = new Date(); 
  formattedDate = this.date.toISOString().slice(0, 10); //slicing by 10 to give the current date in a format of dd-mm-yyyy
  registrationFormData: any = [];  //object for storing the registration form data
  constructor(private fb: FormBuilder, private element: ElementRef) {}
  goto_login = false; 
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

  resetPermanentCity() {
    this.regform.get(['permanent_address', 'city']).setValue('');
  }

  resetCommunicationCity() {
    this.regform.get(['communication_address', 'city']).setValue('');
  }

  resetAddress() {
    this.isSameAsPermanent = !this.isSameAsPermanent;
    if (this.regform.get(['communication_address'])) {
      this.regform.get(['communication_address']).reset();
    }
    this.regform.get(['communication_address', 'country']).setValue('');
  }

  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.element.nativeElement.querySelector('form .ng-invalid');  
    firstInvalidControl.focus(); //without smooth behavior
  }

  get skills() {
    return this.regform.get('skills') as FormArray;
  }

  addSKill() { //add skill when the add skill button is clicked
    this.skills.push(this.fb.control('', Validators.required));  
  }

  isDisable(): boolean {
    return this.skills.length === 1; //if skills length is 1 it will return true
  }

  delete(index: number) {
    if (!this.isDisable()) { // skills remove only if the isDisable is false
      this.skills.removeAt(index);
    }
  }

  onSubmit() {
    if (this.isSameAsPermanent) {   //setting the value of permanent address to Communication address if the Same as Permanent Address is ticked
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
      this.goto_login = true;  //setting to true will gives the login form
      if (this.regform.get('isSameAsPermanent')) {
        this.regform.removeControl('isSameAsPermanent');
      }
      this.regform.addControl('isSameAsPermanent',new FormControl(this.isSameAsPermanent));  //setting isSameAsPermanent in the regform
      this.getFormBody();
    } else {
        this.regform.markAllAsTouched();
        this.scrollToFirstInvalidControl();
    }
  }

  getFormBody() {
    const formValue = this.regform.value;
    this.registrationFormData = {
      First_name: formValue.first_name,
      Last_Name: formValue.last_name,
      Email: formValue.email,
      DOB: formValue.date_of_birth,
      Ph_num: formValue.phone,
      Gender: formValue.gender,
      Permanent_address: {
        Street: formValue.permanent_address.street,
        Country: formValue.permanent_address.country,
        City: formValue.permanent_address.city,
        Region: formValue.permanent_address.region,
        Postal_Code: formValue.permanent_address.postal_code,
      },
      isSameAsPermanent: formValue.isSameAsPermanent,
      Communication_address: {
        Street: formValue.communication_address.street,
        Country: formValue.communication_address.country,
        City: formValue.communication_address.city,
        Region: formValue.communication_address.region,
        Postal_Code: formValue.communication_address.postal_code,
      },
      Skills: formValue.skills,
    };
    console.log(this.registrationFormData);
  }
}
