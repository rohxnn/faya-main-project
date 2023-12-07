import { Component } from '@angular/core';
@Component({
  selector: 'app-input-output-decorator',
  templateUrl: './input-output-decorator.component.html',
  styleUrls: ['./input-output-decorator.component.scss'],
})
export class InputOutputDecoratorComponent {
  list_of_customers:any= [
    {i: 1,name: 'Rahul Dravid',address: '',city: 'Bangalore',state: 'Karnataka',country: 'India',},
    {i: 2,name: 'Sachin Tendulkar',address: '',city: 'Mumbai',state: 'Maharashtra',country: 'India',},
    {i: 3,name: 'Sourav Ganguly',address: '',city: 'Kolkata',state: 'West Bengal',country: 'India',},
    {i: 4,name: 'Mahendra Singh Dhoni',address: '',city: 'Ranchi',state: 'Bihar',country: 'India',},
    {i: 5,name: 'Virat Kohli',address: '',city: 'Delhi',state: 'Delhi',country: 'India',},
  ];
  customer_details = {};
  onEdit(customer: any) {
    this.customer_details = customer;  //assigning the selected customer value into the customer_details
  }

  onUpdate(updated_customer: any) {
    this.customer_details = updated_customer; //assigning the updated customer value into the customer_details
    this.customer_details = '';         //Resetting to null after update
  }
}
