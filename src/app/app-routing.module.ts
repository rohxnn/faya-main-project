import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { InputOutputDecoratorComponent } from './input-output-decorator/input-output-decorator.component';
import { LoginComponent } from './login/login.component';
import { CustomerServiceDependencyInjectionComponent } from './customer-service-dependency-injection/customer-service-dependency-injection.component';

const routes: Routes = [
  { path:'', component:RegistrationComponent },
  { path:'input-output',component:InputOutputDecoratorComponent },
  { path:'service',component:CustomerServiceDependencyInjectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
