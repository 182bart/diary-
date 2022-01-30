import { Component, OnInit } from '@angular/core';
import { record } from '../record';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  records;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.service
      .getAllRecords()
      .subscribe((records) => (this.records = records));
  }
  deteteRecord(record) {
    this.service.deleteRecord(record).subscribe(() => {
      this.getRecords();
    });
  }
}
