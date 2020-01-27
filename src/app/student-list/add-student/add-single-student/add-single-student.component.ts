import { Component, OnInit, Input, Output, OnChanges, SimpleChanges,EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { CommonService } from 'src/app/services/shared/common.service';
import { Department } from 'src/app/models/department.model';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-add-single-student',
  templateUrl: './add-single-student.component.html',
  //styleUrls: ['./add-student.component.css']
})
export class AddSingleStudentComponent implements OnInit {
studentFormGroup : FormGroup
student: Student = new Student();
  departments: any;
//@Input() studentFormInput: FormGroup;
  constructor(private fb : FormBuilder, private c: CommonService) { }

  ngOnInit() {
    this.getDep();
      this.studentFormGroup = this.fb.group({
          deptId: ['',Validators.required],
          name: ['',Validators.required]
      });
  }
  // addSingleStudent(value: any): void {
  //     console.log(value);
  // }
  save()
  {
    console.log(this.studentFormGroup.value);
  }
  getDep(): void{
    this.c.getEntity<Department[]>("http://localhost:64159/api/department").subscribe(dep => this.departments = dep);
  }
}
