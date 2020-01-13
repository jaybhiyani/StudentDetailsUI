import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { AddStudentComponent } from 'src/app/student-list/add-student/add-student.component';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  Department = new Department();
  //addStudentComponent: AddStudentComponent = new AddStudentComponent();
  // studentForm : any;
  // getStudentFormArray(): FormArray{
  //   return this.departmentForm.get('students') as FormArray;
  // }
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.departmentForm = this.fb.group({
      departmentName:['',[Validators.required,Validators.minLength(3)]],
      students: this.fb.array([
        //this.buildStudent()
      ])
    });
    console.log(this.departmentForm);
    
  }
  save()
  {
    console.log(this.departmentForm.value);
  }
  buildStudent(): FormGroup {
    return this.fb.group({
      firstName:'',
      lastName:'' 
    });
    //return;
    
  }
  // studentFormEmit(event)
  // {
  //   debugger;
  //   console.log(event);
  //   this.eve =event;
  // }
  
  pushStudent(): void{
    (this.departmentForm.controls.students as FormArray).push(this.buildStudent());
  }

  popStudent(index: number){
    (this.departmentForm.controls.students as FormArray).removeAt(index);
  }

}
