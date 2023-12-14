import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-validation-component',
  template: `  
              <ng-container *ngIf="control.invalid && (control.touched || control.dirty)" >
              <small *ngIf="control.errors?.required" class="mt">{{key}} is required</small>
              <small *ngIf="control.errors?.pattern">{{key}} is invalid</small>
             </ng-container>
           `,
  styleUrls: ['./validation-component.component.scss']
})
export class ValidationComponentComponent {
  @Input() control:any='';
  @Input() key:any='';
}
