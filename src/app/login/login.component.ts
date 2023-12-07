import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() credentials:any= []; //inputing the values of regform
  password:string= '';

  ngOnInit() { this.password=this.credentials.First_name+this.credentials.Last_Name; }
}
