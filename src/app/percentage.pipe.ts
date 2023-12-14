import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: any, total_mark: number) {
    return parseFloat(((value/total_mark)*100).toFixed(2)) ;
  }
}
