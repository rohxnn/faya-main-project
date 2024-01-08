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
  customer_id:any='';
  isOnEdit: boolean = false;
  isAdding:boolean=false;
  constructor(private customer:CustomersService){  }

  ngOnInit() {
    this.getCustomer();
    console.log(this.date)
  }

  private getCustomer(){
    this.customer.fetchCustomer().subscribe((response) => {
        this.customer_details=response;
    },
    err => {
    console.log(err.message,'hit')
    })
  }

  onEdit(id:any){
    this.isOnEdit = true;
     this.customer_id=id;
  }

  onDelete(id:any){
    this.customer.deletebyId(id).subscribe(() => {
        alert("Delete Successfully")
        this.getCustomer();
    },  err => {
      console.log(err.message,'hit')
          })
  }

  checkUpdateValue(check:boolean){
      if(check){
        this.getCustomer();
      }}
      
  resetEdit(){  this.isOnEdit=false; }
}
