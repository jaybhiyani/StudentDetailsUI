import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QueryParameters } from '../models/queryParameters.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html'
})
export class DepartmentListComponent implements OnInit {
  departments : Department[];
  searchDepartmentForm: FormGroup;
  queryParameters : QueryParameters = new QueryParameters();
  errorMessage: string;

  constructor(private fb: FormBuilder, private departmentService : DepartmentService){}

  ngOnInit() {
    this.searchDepartmentForm = this.fb.group({
      searchString: [""]
    });
     this.getDepartments();
  }
  getDepartments() : void
  {
    this.queryParameters.searchString = "";
    this.queryParameters.sortOrder = "";
    this.departmentService.getDepartments(this.queryParameters).subscribe(dep => this.departments = dep);
  }

  removeDepartment(id: number, departmentName: string): void{
    if(confirm(`Are you sure you want to delete department : ${departmentName}?`))
    {
      this.departmentService.deleteDepartment(id).subscribe();
    }
  }
  searchDepartment(): void{
    if(this.searchDepartmentForm.controls.searchString.value != ''){
      this.queryParameters.searchString = this.searchDepartmentForm.controls.searchString.value;
      this.queryParameters.sortOrder = "";
      this.departmentService.searchDepartment(this.queryParameters).subscribe({
        next: departments => {
          this.departments = departments;
        },
        error: err => this.errorMessage = err
      });
    } else {
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
