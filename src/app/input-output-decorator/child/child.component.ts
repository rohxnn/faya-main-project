import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Input()
  customer_detail: any;
  name: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  @Output() update_details = new EventEmitter<any>();

  ngOnChanges() {
    this.name = this.customer_detail.name;
    this.address = this.customer_detail.address;
    this.city = this.customer_detail.city;
    this.state = this.customer_detail.state;
    this.country = this.customer_detail.country;
  }

  updateFormValues() {
    this.customer_detail.name = this.name;
    this.customer_detail.address = this.address;
    this.customer_detail.city = this.city;
    this.customer_detail.state = this.state;
    this.customer_detail.country = this.country;
  }

  onUpdate() {
    this.updateFormValues();
    this.update_details.emit(this.customer_detail);
  }
}
