import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  addData(info) {
    const data = {
      title: info.title,
      description: info.description,
      status: info.status,
      date: info.date,
      placeName: info.placeName,
      address: info.address
    };
    return this.http.post('http://localhost:3000/data', data);
  }

  getData() {
    return this.http.get('http://localhost:3000/data');
  }

  patchData(data, id) {
    return this.http.put(`http://localhost:3000/data/${id}`, data);
  }

  removeData(id) {
    return this.http.delete(`http://localhost:3000/data/${id}`);
  }
}
