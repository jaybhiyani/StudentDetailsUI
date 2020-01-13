import { Component, OnInit, Input, Output, OnChanges, SimpleChanges,EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-single-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddSingleStudentComponent implements OnInit {
studentFormGroup : FormGroup
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
      this.studentFormGroup = this.fb.group({
          deptId: '',
          firstName: '',
          lastName: ''

      })
  }
  addSingleStudent(value: any): void {
      console.log(value);
  }
}
