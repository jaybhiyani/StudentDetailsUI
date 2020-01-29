import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';
import { CommonService } from '../services/shared/common.service';
import { Student } from '../models/student.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments : Department[];
  searchDepartmentForm: FormGroup;
  notFoundMessage: string = null;
  sortOrder: string = '-';
  ordered = 0;
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
    // debugger;
    this.departmentService.getDepartments().subscribe(dep => this.departments = dep);
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
    // console.log();
    if(this.searchDepartmentForm.controls.searchString.value !== ''){
    this.departmentService.searchDepartment(this.searchDepartmentForm.controls.searchString.value).subscribe({
      next: departments => {
        this.departments = departments;
        this.notFoundMessage = null;
      },
      error: err => this.notFoundMessage = err
    });
  } else {
    this.notFoundMessage = null;
    this.getDepartments();
  }
  }
  orderBy() {
    if(this.ordered == 0){
      this.ordered = 1;
      this.sortOrder = '^';
      this.departmentService.orderBy(this.sortOrder).subscribe({
        next: orderedDepartments => this.departments = orderedDepartments
      });
    } else{
    if(this.ordered == 1){
      this.ordered = 2;
      this.sortOrder = 'v';
      this.departmentService.orderBy(this.sortOrder).subscribe({
        next: orderedDepartments => this.departments = orderedDepartments
      });
    } else{
      if(this.ordered == 2){
        this.ordered = 0;
        this.sortOrder = '-';
        this.getDepartments();
      }
    }
  }
  }
}
