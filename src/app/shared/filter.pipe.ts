import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(v: any, formValue?: any): any {
    let value = v;
    if (formValue.status) {
      if (formValue.status === 'all') {
        value = v;
      } else {
        value = v.filter(item => {
          if (item.status === formValue.status) {
            return true;
          }
        });
      }
    }

    if (formValue.dateFrom) {
      let d = new Date(formValue.dateFrom);
      value = value.filter(item => {
        let df = new Date(item.date);
        if (d.getFullYear() <= df.getFullYear() && d.getMonth() < df.getMonth()) {
          return true;
        } else if (d.getFullYear() <= df.getFullYear() && d.getMonth() <= df.getMonth() && d.getDate() <= df.getDate()) {
          return true;
        }
      });
    }

    if (formValue.dateTo) {
      let d = new Date(formValue.dateTo);
      value = value.filter(item => {
        let df = new Date(item.date);
        if (d.getFullYear() >= df.getFullYear() && d.getMonth() > df.getMonth()) {
          return true;
        } else if (d.getFullYear() >= df.getFullYear() && d.getMonth() >= df.getMonth() && d.getDate() >= df.getDate()) {
          return true;
        }
      });
    }

    if (formValue.place) {
      value = value.filter(item => {
        if (item.placeName.toLowerCase().indexOf(formValue.place.toLowerCase()) > -1) {
          return true;
        }
      });
    }

    if (formValue.address) {
      value = value.filter(item => {
        if (item.address.toLowerCase().indexOf(formValue.address.toLowerCase()) > -1) {
          return true;
        }
      });
    }

    return value;
  }

}
