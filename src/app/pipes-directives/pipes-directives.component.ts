import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-directives',
  templateUrl: './pipes-directives.component.html',
  styleUrls: ['./pipes-directives.component.scss']
})
export class PipesDirectivesComponent {
  list_of_customers:any= [
    {i: 1,name: 'Rahul Dravid',address: '',city: 'Bangalore',state: 'Karnataka',country: 'India',},
    {i: 2,name: 'Sachin Tendulkar',address: '',city: 'Mumbai',state: 'Maharashtra',country: 'India',},
    {i: 3,name: 'Sourav Ganguly',address: '',city: 'Kolkata',state: 'West Bengal',country: 'India',},
    {i: 4,name: 'Mahendra Singh Dhoni',address: '',city: 'Ranchi',state: 'Bihar',country: 'India',},
    {i: 5,name: 'Virat Kohli',address: '',city: 'Delhi',state: 'Delhi',country: 'India',},
  ];
}
