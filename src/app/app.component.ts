import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormArray,Validators,AbstractControl,FormGroup} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  regform:FormGroup;
  ischecked=true;
  constructor(private fb:FormBuilder)
  {}
  ngOnInit() {
    this.regform=this.fb.group(
      {
        fname:['',Validators.required],
        lname:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        date:['',Validators.required],
        num:['',Validators.required],
        gender:['',Validators.required],
        paddress:this.fb.group({
        saddress:['',Validators.required],
        country:['',Validators.required],
        city:['',Validators.required],
        region:['',Validators.required],
        pin:['',Validators.required],

      }),
      caddress:this.fb.group({
        saddress1:['',Validators.required],
        country1:['',Validators.required],
        city1:['',Validators.required],
        region1:['',Validators.required],
        pin1:['',Validators.required],

      }),

        skills:this.fb.array(
          [
            this.fb.control('')
          ]
        )
      }
    )
 
  
  }
  title = 'faya';
  isChecked()
  {
    this.ischecked=false;
  }
}
