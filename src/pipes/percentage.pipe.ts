import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {
  transform(value: any, total_mark: number,decimal:number) {
    const result = (value / total_mark) * 100;
    return result.toFixed(decimal);
  }
}
