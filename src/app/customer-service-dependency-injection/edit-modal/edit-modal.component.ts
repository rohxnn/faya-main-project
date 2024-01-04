import { Component,Input, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import {Observable, forkJoin} from 'rxjs'
import { FormGroup,FormBuilder,FormArray} from '@angular/forms'

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit  {
  
  customer_detail:any='';

  customer_form:FormGroup;
  constructor(private fb:FormBuilder,private customer:CustomersService){
  }
     
  customerformDetails(){
    this.customer_form=this.fb.group({
      first_name:[''],
      last_name:[''],
      email:[''],
      ph_no:[''],
      plans:[''],
      dob:[''],
      skill:this.fb.array([this.fb.control('')]),
    })
  }

  ngOnInit() { 
    this.customerformDetails();
  }

  @Input() id:any;

  ngOnChanges(){
    this.customer.getbyId(this.id).subscribe((response)=>{
      this.customer_detail=response;
      this.updateFormValues();
      console.log(this.customer_form.value  )
    });   
  }
  
  private updateFormValues() {
    this.customer_form.patchValue({
      first_name: this.customer_detail.First_name,
      last_name: this.customer_detail.Last_name,
      email: this.customer_detail.Email,
      ph_no: this.customer_detail.Ph_num,
      dob: this.customer_detail.DOB,
      plans: this.customer_detail.Gender,
    });
    this.setSkills(this.customer_detail.skill);
  }

  get skills() {
    return this.customer_form.get('skill') as FormArray;
  }

  setSkills(skills: string[]) {
    const skillsArray = skills.map((skill) => this.fb.control(skill));
    this.customer_form.setControl('skill', this.fb.array(skillsArray));
  }


  addSkill(){
   this.skills.push(this.fb.control(''));
  }

  delete(index:any){
    this.skills.removeAt(index);
  }

  onUpdate(){
      // this.updateChanges();
      this.customer.updatebyId(this.id,this.customer_detail).subscribe((response)=>{
        alert('Customer updated successfully');
      })
  }

  // private updateChanges(){
  //   const formValue=this.customer_form.value;
  //   formValue.patchValue({
  //     this.customer_detail.First_name=formValue.first_name,
  //     this.customer_detail.Last_name=formValue.last_name,
  //     this.customer_detail.Email=formValue.email,
  //     this.customer_detail.Ph_num=formValue.ph_no,
  //     this.customer_detail.DOB=formValue.dob,
  //     this.customer_detail.skill=formValue.skill,
  //     this.customer_detail.Gender=formValue.plans,
  //   })
   
  // }
}

