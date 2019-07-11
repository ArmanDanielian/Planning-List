import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searching?: any): any {
    if (searching) {
      searching = searching.toLowerCase();
      return value.filter(item => {
        if (item.title.toLowerCase().indexOf(searching) !== -1) {
          return true;
        }
        if (item.placeName.toLowerCase().indexOf(searching) !== -1) {
          return true;
        }
        if (item.address.toLowerCase().indexOf(searching) !== -1) {
          return true;
        }
      });
    }
    return value;
  }

}
