import { Component, OnInit, Input, Output, OnChanges, SimpleChanges,EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  @Input() studentFormInput: FormGroup;
  // @Output() studentFormChange = new EventEmitter<FormGroup>();
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    // debugger;
    // this.studentFormInput = this.buildStudent();
    // this.studentFormChange.emit(this.studentFormInput);
  }
  buildStudent(): FormGroup
  {
    return this.fb.group({
      name: ['',Validators.required]
    });
  }

}
