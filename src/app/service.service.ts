import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { record } from './record';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  url: string = 'http://localhost:3000/records';
  urls: string = 'http://localhost:3000/records/1';

  constructor(public httpService: HttpClient) {}

  getRecord(recordId) {
    return this.httpService.get(`${this.url}/${recordId}`);
  }
  getAllRecords(): Observable<Array<record>> {
    return this.httpService.get<[]>(this.url);
  }
  deleteRecord(record) {
    return this.httpService.delete(`${this.url}/${record.id}`);
  }
  editRecord(record, recordId) {
    return this.httpService.put(`${this.url}/${recordId}`, record);
  }
  saveRecord(record) {
    return this.httpService.post(this.url, record);
  }
}
