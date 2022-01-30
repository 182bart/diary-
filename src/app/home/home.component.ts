import { Component, OnInit } from '@angular/core';
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

  // get all records form server
  getRecords() {
    this.service
      .getAllRecords()
      .subscribe((records) => (this.records = records));
  }

  // remove recorm from server
  deteteRecord(record) {
    this.service.deleteRecord(record).subscribe(() => {
      this.getRecords();
    });
  }
}
