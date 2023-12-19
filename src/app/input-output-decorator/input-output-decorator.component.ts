import { Component } from '@angular/core';
@Component({
  selector: 'app-input-output-decorator',
  templateUrl: './input-output-decorator.component.html',
  styleUrls: ['./input-output-decorator.component.scss'],
})
export class InputOutputDecoratorComponent {
  // list_of_customers:any= [
  //   {i: 1,name: 'Rahul Dravid',address: '',city: 'Bangalore',state: 'Karnataka',country: 'India',},
  //   {i: 2,name: 'Sachin Tendulkar',address: '',city: 'Mumbai',state: 'Maharashtra',country: 'India',},
  //   {i: 3,name: 'Sourav Ganguly',address: '',city: 'Kolkata',state: 'West Bengal',country: 'India',},
  //   {i: 4,name: 'Mahendra Singh Dhoni',address: '',city: 'Ranchi',state: 'Bihar',country: 'India',},
  //   {i: 5,name: 'Virat Kohli',address: '',city: 'Delhi',state: 'Delhi',country: 'India',},
  // ];
  total_mark=600;
  list_of_customers:any= [
    {i: 1,name: 'John Smith',address: '',gender:'Male',dob:'11-12-1997',course:'mba',marks:520,percentage:'',fees:1899},
    {i: 2,name: 'Mark Vought',address: '',gender:'Male',dob:'10-6-1998',course:'b.tech',marks:420,percentage:'',fees:2899},
    {i: 3,name: 'Sarah King',address: '',gender:'Female',dob:'09-22-1996',course:'b.tech',marks:540,percentage:'',fees:2899},
    {i: 4,name: 'Merry Jane',address: '',gender:'Female',dob:'06-12-1995',course:'mba',marks:380,percentage:'',fees:1899},
    {i: 5,name: 'Steve Smith',address: '',gender:'Male',dob:'12-21-1999',course:'m.sc',marks:430,percentage:'',fees:799},
    {i: 6,name: 'Jonas Weber',address: '',gender:'Male',dob:'06-18-1997',course:'m.sc',marks:320,percentage:'',fees:799},
  ];
  filterText:string='all';
  customer_details = {};
  onEdit(customer: any) {
    this.customer_details = customer;  //assigning the selected customer value into the customer_details
  }

  onUpdate(updated_customer: any) {
    this.customer_details = updated_customer; //assigning the updated customer value into the customer_details
    this.customer_details = '';         //Resetting to null after update
  }
}
