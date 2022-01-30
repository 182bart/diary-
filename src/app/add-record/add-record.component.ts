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

  // selectedGrade: number;
  rekord;
  constructor(
    public formBuilder: FormBuilder,
    public service: ServiceService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newRecord = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      class: ['', Validators.required],
      grade: ['', Validators.required],
    });
    this.recordId = this.activatedRoute.snapshot.params.id;

    this.service.getRecord(this.recordId).subscribe((record) => {
      this.rekord = record;
      this.editRecord = this.formBuilder.group({
        name: [this.rekord.name, Validators.required],
        surname: [this.rekord.surname, Validators.required],
        class: ['', Validators.required],
        grade: ['', Validators.required],
      });
      this.editRecord.controls['class'].setValue(this.rekord.class);
      this.editRecord.controls['grade'].setValue(this.rekord.grade);
    });
  }
  add() {
    if (this.newRecord.valid) {
      this.valid = true;
      const formValue = this.newRecord.getRawValue();
      this.service.saveRecord(formValue).subscribe();
    } else {
      this.valid = true;
    }
  }
  edit() {
    if (this.editRecord.valid) {
      this.valid = true;
      const formValue = this.editRecord.getRawValue();
      this.service.editRecord(formValue, this.rekord.id).subscribe();
    } else {
      this.valid = true;
    }
  }
}
