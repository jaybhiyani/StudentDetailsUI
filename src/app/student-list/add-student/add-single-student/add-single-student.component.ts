import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { CommonService } from 'src/app/services/shared/common.service';
import { Department } from 'src/app/models/department.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { QueryParameters } from 'src/app/models/queryParameters.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-add-single-student',
  templateUrl: './add-single-student.component.html'
})
export class AddSingleStudentComponent implements OnInit {
studentFormGroup : FormGroup
student: Student = new Student();
departments: Department[];
queryParameters: QueryParameters = new QueryParameters();
  constructor(private fb : FormBuilder, private departmentService: DepartmentService, private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.getDepartments();
      this.studentFormGroup = this.fb.group({
          name: ['',Validators.required],
          departmentId: ['',Validators.required]
          
      });
  }
  save()
  {
    this.student.name = this.studentFormGroup.controls.name.value;
    this.student.departmentId = +this.studentFormGroup.controls.departmentId.value;
    this.studentService.addStudent(this.student).subscribe({
      next: () => this.onSaveComplete(),
      error: err => console.log(err)
    });
  }
  getDepartments() : void
  {
    this.queryParameters.searchString = "";
    this.queryParameters.sortOrder = "";
    this.departmentService.getDepartments(this.queryParameters).subscribe(dep => this.departments = dep);
  }
  // getDep(): void{
  //   this.c.getEntity<Department[]>("http://localhost:64159/api/department").subscribe(dep => this.departments = dep);
  // }
  onSaveComplete(){
    this.studentFormGroup.reset();
    this.router.navigate(['/students']);
  }
}
