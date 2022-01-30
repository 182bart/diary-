import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
})
export class AddRecordComponent implements OnInit {
  allClass = ['4a', '4b', '4c', '5a', '5b', '5c', '6a', '6b', '6c'];
  newRecord: FormGroup;
  editRecord: FormGroup;
  recordId;
  valid = false;
  record;
  saved =false;

  constructor(
    public formBuilder: FormBuilder,
    public service: ServiceService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // make empty form for new Record 
    this.newRecord = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      class: ['', Validators.required],
      grade: ['', Validators.required],
    });

    // get ID chosen Record
    this.recordId = this.activatedRoute.snapshot.params.id;

    // get chosen Record from server and add values to form
    this.service.getRecord(this.recordId).subscribe((record) => {
      this.record = record;
      this.editRecord = this.formBuilder.group({
        name: [this.record.name, Validators.required],
        surname: [this.record.surname, Validators.required],
        class: ['', Validators.required],
        grade: ['', Validators.required],
      });
      this.editRecord.controls['class'].setValue(this.record.class);
      this.editRecord.controls['grade'].setValue(this.record.grade);
    });
  }

  //  save new record in server
  add() {
    if (this.newRecord.valid) {
      this.valid = true;
      const formValue = this.newRecord.getRawValue();
      this.service.saveRecord(formValue)
      .subscribe(()=>this.saved=true);
    } else {
      this.valid = true;
    }
  }

  //  save edited record in server
  edit() {
    if (this.editRecord.valid) {
      this.valid = true;
      const formValue = this.editRecord.getRawValue();
      this.service.editRecord(formValue, this.record.id)
      .subscribe(()=>this.saved=true);
    } else {
      this.valid = true;
    }
  }
}
