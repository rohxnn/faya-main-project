import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import { RegistrationComponent } from './registration/registration.component';
import { InputOutputDecoratorComponent } from './input-output-decorator/input-output-decorator.component';

import { ChildComponent } from './input-output-decorator/child/child.component';
import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [AppComponent,RegistrationComponent,InputOutputDecoratorComponent,ChildComponent,LoginComponent],
  imports: [BrowserModule,AppRoutingModule,ReactiveFormsModule,NgxMaskModule.forRoot(),FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
