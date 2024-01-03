import { Component, OnInit } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http'
import {map,Observable} from 'rxjs'
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-customer-service-dependency-injection',
  templateUrl: './customer-service-dependency-injection.component.html',
  styleUrls: ['./customer-service-dependency-injection.component.scss'],
})
export class CustomerServiceDependencyInjectionComponent implements OnInit {
  customer_details: any = [];
  date=new Date();
  formattedDate = this.date.toISOString().slice(0, 10);
  id:any='';
  isOnEdit: boolean;

  constructor(private customer:CustomersService){  }
  ngOnInit() {
    this.getCustomer();
    console.log(this.date)
  }
  private getCustomer(){
    this.customer.fetchCustomer().subscribe((customer)=>{
        this.customer_details=customer;
    },
    error => console.log("error")
    )
  }
  onEdit(id:any){
    this.isOnEdit = true;
     this.id=id;
     console.log(this.id)
  }
}
