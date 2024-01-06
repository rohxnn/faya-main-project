import { Component,Input, OnInit,Output,EventEmitter,OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import {Observable, forkJoin} from 'rxjs'
import { FormGroup,FormBuilder,FormArray,Validators} from '@angular/forms'
import { noWhitespaceValidator } from 'src/app/shared/custom-validator/whitespace.validators';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit,OnChanges  {
  customer_detail:any='';
  isUpdated:boolean=false;
  date=new Date();
  formattedDate = this.date.toISOString().slice(0, 10);
  customer_form:FormGroup;
  count:number;
  @Input() id:any;
  @Input() isEditCustomer:boolean;
  @Output() updateValue=new EventEmitter<any>();

  constructor(private fb:FormBuilder,private customer:CustomersService){
  }
  ngOnChanges(){
    {
      console.log(this.isEditCustomer);
      this.customer.getbyId(this.id).subscribe((response)=>{
        this.customer_detail=response;
        this.updateFormValues();
        console.log(this.customer_form.value)
      }); 
     
    }
    
  }

  ngOnInit() { 
    this.customerformDetails();
  } 

  customerformDetails(){
    this.customer_form=this.fb.group({
      first_name:['',[Validators.required,noWhitespaceValidator]],
      last_name:['',[Validators.required,noWhitespaceValidator]],
      email:['',[Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),noWhitespaceValidator]],
      ph_no:['',[Validators.required,noWhitespaceValidator]],
      plans:['',[Validators.required,noWhitespaceValidator]],
      dob:['',[Validators.required,noWhitespaceValidator]],
      skill:this.fb.array([this.fb.control('',[Validators.required,noWhitespaceValidator])]),
    })
  }

  private updateFormValues() {
    this.count=this.id;
    if(this.isEditCustomer){
      this.customer_form.patchValue({
        first_name: this.customer_detail.First_name,
        last_name: this.customer_detail.Last_name,
        email: this.customer_detail.Email,
        ph_no: this.customer_detail.Ph_num,
        dob: this.customer_detail.DOB,
        plans: this.customer_detail.Gender,
      });
      if(this.customer_detail.skill){
        this.setSkills(this.customer_detail.skill);}
      
    }
    else{
      this.customer_form.patchValue({
        first_name:'',
        last_name:'',
        email:"",
        ph_no:'',
        dob: "",
        plans: '',
        skill:[],
      })
    }
  }

  get skills() {
    return this.customer_form.get('skill') as FormArray;
  }

  setSkills(skills: any[]) {
    console.log(skills)
    const skillsArray = skills.map((skill) => this.fb.control(skill));
    this.customer_form.setControl('skill', this.fb.array(skillsArray));
  }

  addSkill(){
   this.skills.push(this.fb.control('',[Validators.required,noWhitespaceValidator]));
  }

  delete(index:any){
    this.skills.removeAt(index);
  }

  onUpdate(){
    if(this.isEditCustomer){
      this.updateChanges();
      this.customer.updatebyId(this.id,this.customer_detail).subscribe((response)=>{
        this.isUpdated=true;
        this.updateValue.emit(this.isUpdated)
      })
    }
    if(!this.isEditCustomer){
      console.log("no changes")
      this.updateFormValues();
      if(this.customer_form.valueChanges){
        this.onCreateCustomer();
      }
    }
      
  }

  private updateChanges(){
    const formValue=this.customer_form.value;
      this.customer_detail.First_name=formValue.first_name;
      this.customer_detail.Last_name=formValue.last_name;
      this.customer_detail.Email=formValue.email;
      this.customer_detail.Ph_num=formValue.ph_no;
      this.customer_detail.DOB=formValue.dob;
      this.customer_detail.skill=formValue.skill;
      this.customer_detail.Gender=formValue.plans;
  }

   onCreateCustomer() {
        this.updateChanges();
        this.customer_detail.addControl('id',this.count+1)
      this.customer.createUser(this.customer_detail).subscribe((response) => {
        console.log("created");
        
      })
  }
}



