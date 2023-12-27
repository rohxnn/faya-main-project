import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true,
})
export class FilterPipe implements PipeTransform {
  transform(people: any, filterStudent: any) {
    if (filterStudent === 'all') {
      return people;
    } else {
      return people.filter((check) => {
        return check.gender.toLowerCase() === filterStudent.toLowerCase();
      });
    }
  }
}
