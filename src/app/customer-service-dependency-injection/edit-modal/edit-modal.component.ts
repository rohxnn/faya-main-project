import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, ElementRef } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { Observable } from 'rxjs'
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
import { noWhitespaceValidator } from 'src/app/shared/custom-validator/whitespace.validators';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit, OnChanges {
  customer_detail: any = '';
  isUpdated: boolean = false;
  date = new Date();
  formattedDate = this.date.toISOString().slice(0, 10);
  customer_form: FormGroup;
  @Input() id: any;
  @Input() isEditCustomer: boolean;
  @Output() updateValue = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private customer: CustomersService) {}

  ngOnChanges() {
    console.log(this.isEditCustomer);
    if (this.isEditCustomer) { this.getCustomerById(); }
    if (!this.isEditCustomer) { this.customerformDetails(); }
  }

  ngOnInit() {
    this.customerformDetails();
  }

  getCustomerById() {
    this.customer.getbyId(this.id).subscribe((response) => {
      this.customer_detail = response;
      this.updateFormValues();
      console.log(this.customer_form.value)});
  }

  customerformDetails() {
    this.customer_form = this.fb.group({
      f_name: ['', [Validators.required, noWhitespaceValidator]],
      l_name: ['', [Validators.required, noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), noWhitespaceValidator]],
      phone_number: ['', [Validators.required, noWhitespaceValidator]],
      gender: ['', [Validators.required, noWhitespaceValidator]],
      dob: ['', [Validators.required, noWhitespaceValidator]],
      Skills: this.fb.array([this.fb.control('', [Validators.required, noWhitespaceValidator])]),
    })
  }

  private updateFormValues() {
    if (this.isEditCustomer) {
      this.customer_form.patchValue({
        f_name: this.customer_detail.f_name,
        l_name: this.customer_detail.l_name,
        email: this.customer_detail.email,
        phone_number: this.customer_detail.phone_number,
        dob: this.customer_detail.dob,
        gender: this.customer_detail.gender,
      });
      if (this.customer_detail.Skills) { this.setSkills(this.customer_detail.Skills); }
    }
  }

  get skills() { return this.customer_form.get('Skills') as FormArray; }

  setSkills(skills: any[]) {
    console.log(skills)
    const skillsArray = skills.map((skill) => this.fb.control(skill));
    this.customer_form.setControl('Skills', this.fb.array(skillsArray));
  }

  addSkill() { this.skills.push(this.fb.control('', [Validators.required, noWhitespaceValidator]));  }

  delete(index: any) { this.skills.removeAt(index); }

  onClick() {
    if (this.customer_form.valid) {
      if (this.isEditCustomer) {
        console.log("hiii" + this.customer_detail.id);
        this.updateChanges();
        this.customer.updatebyId(this.id, this.customer_detail).subscribe(() => {
          alert("Updated Successfully");
          this.isUpdated = true;
          this.updateValue.emit(this.isUpdated) })
      }
      if (!this.isEditCustomer) {
        console.log("no changes")
        this.onCreateCustomer()
      } 
    }
    else { this.customer_form.markAllAsTouched(); }
  }

  private updateChanges() {
    const formValue = this.customer_form.value;
    this.customer_detail.f_name = formValue.f_name;
    this.customer_detail.l_name = formValue.l_name;
    this.customer_detail.email = formValue.email;
    this.customer_detail.phone_number = formValue.phone_number;
    this.customer_detail.dob = formValue.dob;
    this.customer_detail.Skills = formValue.Skills;
    this.customer_detail.gender = formValue.gender;
  }

  onCreateCustomer() {
    this.customer.createUser(this.customer_form.value).subscribe(() => {
      alert("User is Created");
      this.isUpdated = true;
      this.updateValue.emit(this.isUpdated);
      this.customer_form.reset();
  });
  }
}



