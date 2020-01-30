import { Component, OnInit, Input, Output, OnChanges, SimpleChanges,EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent implements OnInit {
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
  }
  buildStudent(): FormGroup
  {
    return this.fb.group({
      name: ['',Validators.required]
    });
  }

}
