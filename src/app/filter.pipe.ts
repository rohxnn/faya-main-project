import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(people:any, filterStudent:any){
    if(people.length === 0 || filterStudent === 'all'){
      return people;
    } else {
      return people.filter((check) => {
          return check.gender.toLowerCase() === filterStudent.toLowerCase();
      })
    }  return ;
  }
}
