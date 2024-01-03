import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent  {
  @Input() id:any;
  ngOnChanges(){
    console.log("id changed",this.id);
  }
}
