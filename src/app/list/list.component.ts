import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  form: FormGroup;
  formFilter: FormGroup;
  data: any = [];
  moment = new Date();
  date = {
    year: this.moment.getFullYear(),
    month: this.moment.getMonth(),
    day: this.moment.getDate()
  };
  searchingItem = '';
  item;
  flag = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      placeName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });

    this.formFilter = new FormGroup({
      status: new FormControl('all'),
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
      place: new FormControl(),
      address: new FormControl()
    });

    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }

  openModal() {
    this.flag = true;
    this.form.reset();
    this.form.get('status').setValue('notFinished');
  }

  save() {
    this.dataService.addData(this.form.value).subscribe((data) => {
      let d = new Date(data['date']);
      if (d.getFullYear() <= this.date.year && d.getMonth() <= this.date.month && d.getDate() < this.date.day && data['status'] === 'notFinished') {
        data['status'] = 'failed';
      } else if (d.getFullYear() === this.date.year && d.getMonth() === this.date.month && d.getDate() === this.date.day && data['status'] === 'notFinished') {
        data['status'] = 'today';
      }
      this.dataService.patchData(data, data['id']).subscribe(() => {
        this.dataService.getData().subscribe(data => {
          this.data = data;
        });
      });
      this.form.reset();
    });
  }


  index(n) {
    this.flag = false;
    this.item = n;
    this.form.setValue({
      title: this.item.title,
      description: this.item.description,
      status: this.item.status,
      date: this.item.date,
      placeName: this.item.placeName,
      address: this.item.address
    });
  }

  change() {
    let obj = this.form.value;
    let d = new Date(obj.date);
    if (d.getFullYear() <= this.date.year && d.getMonth() <= this.date.month && d.getDate() < this.date.day && obj.status === 'notFinished') {
      obj.status = 'failed';
    } else if (d.getFullYear() === this.date.year && d.getMonth() === this.date.month && d.getDate() === this.date.day && obj.status === 'notFinished') {
      obj.status = 'today';
    } else if (d.getFullYear() >= this.date.year && d.getMonth() >= this.date.month && d.getDate() > this.date.day && obj.status === 'notFinished') {
      obj.status = 'notFinished';
    }
    this.dataService.patchData(obj, this.item.id).subscribe((data) => {
      this.dataService.getData().subscribe((data) => {
        this.data = data;
      });
    });
  }

  delete(n) {
    this.item = n;
    this.dataService.removeData(this.item.id).subscribe(() => {
      this.dataService.getData().subscribe((data) => {
        this.data = data;
      });
    });
  }

  kochak(e) {
    this.searchingItem = e.target.value;
  }
}
