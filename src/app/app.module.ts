import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import { RegistrationComponent } from './registration/registration.component';
import { InputOutputDecoratorComponent } from './input-output-decorator/input-output-decorator.component';
import { ChildComponent } from './input-output-decorator/child/child.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidationComponentComponent } from './shared/common-validation-error/validation-component.component';
import { PercentagePipe } from './shared/pipes/percentage.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { CustomerServiceDependencyInjectionComponent } from './customer-service-dependency-injection/customer-service-dependency-injection.component';
import {HttpClientModule} from '@angular/common/http';
import { EditModalComponent } from './customer-service-dependency-injection/edit-modal/edit-modal.component'

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    InputOutputDecoratorComponent,
    ChildComponent,
    LoginComponent,
    ValidationComponentComponent,
    PercentagePipe,
    FilterPipe,
    CustomerServiceDependencyInjectionComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    NgbModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
