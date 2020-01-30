import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';
import { CommonService } from '../services/shared/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QueryParameters } from '../models/queryParameters.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html'
})
export class DepartmentListComponent implements OnInit {
  departments : Department[];
  searchDepartmentForm: FormGroup;
  resultLength: number = -1;
  queryParameters : QueryParameters = new QueryParameters();

  constructor(private fb: FormBuilder, private departmentService : DepartmentService, private c: CommonService){}

  ngOnInit() {
    this.searchDepartmentForm = this.fb.group({
      searchString: ''
    });
     this.getDepartments();
    //this.getDep();
  }
  getDepartments() : void
  {
    this.queryParameters.searchString = "";
    this.queryParameters.sortOrder = "";
    this.departmentService.getDepartments(this.queryParameters).subscribe(dep => this.departments = dep);
  }

  getDep(): void{
    this.c.getEntity<Department[]>("http://localhost:64159/api/department").subscribe(dep => this.departments = dep);
  }
  /*getStudent(): void{
    this.c.getEntity<Student[]>("http://localhost:64159/api/student").subscribe(st => this.students = st);
  }*/

  removeDepartment(id: number, departmentName: string): void{
    console.log(id);
    console.log(departmentName);
    if(confirm(`Delete Department : ${departmentName}?`))
    {
      // debugger;
      this.departmentService.deleteDepartment(id).subscribe();
      console.log(`Department : ${departmentName} deleted`);
    }
  }
  searchDepartment(): void{
    if(this.searchDepartmentForm.controls.searchString.value != ''){
      this.queryParameters.searchString = this.searchDepartmentForm.controls.searchString.value;
      this.queryParameters.sortOrder = "";
      this.departmentService.searchDepartment(this.queryParameters).subscribe({
        next: departments => {
          this.departments = departments;
          this.resultLength =  this.departments.length;
        },
        error: err => console.log(err)
      });
    } else {
    this.resultLength = -1;
    this.getDepartments();
  }
  }
  orderBy() {
    this.queryParameters.sortOrder = "d";
    this.departmentService.orderBy(this.queryParameters).subscribe({
      next: orderedDepartments => this.departments = orderedDepartments
      });
  }
}
