import { Component,OnInit,ChangeDetectorRef} from '@angular/core';
import {FormBuilder,FormArray,Validators,AbstractControl,FormGroup} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  regform:FormGroup;
  isSameAsPermanent:boolean=false;
  constructor(private fb:FormBuilder)
  {}
  ngOnInit() {
    this.regform=this.fb.group(
      {
        First_name:['',Validators.required],
        Last_name:['',Validators.required],
        Email:['',[Validators.required,Validators.email]],
        DOB:['',Validators.required],
        Ph_num:['',Validators.required],
        Gender:['',Validators.required],
        Permanent_address:this.fb.group({
          Street:['',Validators.required],
          Country:['Country',Validators.required],
          City:['',Validators.required],
          Region:['',Validators.required],
          Postal_code:['',Validators.required],

      }),
      isSameAsPermanent:[this.isSameAsPermanent],
      Communication_address:this.fb.group({
        Street:['',Validators.required],
        Country:['Country',Validators.required],
        City:['',Validators.required],
        Region:['',Validators.required],
        Postal_code:['',Validators.required],

      }),
     
        skills:this.fb.array(
          [
            this.fb.control('',Validators.required)
          ]
        )
       
      }
    )
 
  
  }
  title = 'faya';
  
  get skills()
  {
      return this.regform.get('skills') as FormArray
  }
  addSKill()
  {
      this.skills.push(
        this.fb.control('')
      )
  }
  delete(index:number)
  {
      this.skills.removeAt(index);
  }
  
  onSubmit()
  {
    if(this.isSameAsPermanent)
    {
      const addr=this.regform.get('Permanent_address')?.value;
      this.regform.controls['Communication_address'].setValue({
        Street: addr.Street,
        Country:addr.Country,
        City:addr.City,
        Region:addr.Region,
        Postal_code:addr.Postal_code
      });
     
    }
    console.log(this.regform)
   
  }

}
