import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-validation-component',
  templateUrl: './validation-component.component.html',
  styleUrls: ['./validation-component.component.scss']
})
export class ValidationComponentComponent {
  @Input() control:any='';
  @Input() key:any='';
}
