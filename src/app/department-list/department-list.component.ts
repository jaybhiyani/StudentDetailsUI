import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';
import { CommonService } from '../services/shared/common.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments : Department[];
  constructor(private departmentService : DepartmentService, private c: CommonService){}

  ngOnInit() {
    // this.getDepartments();
    this.getDep();
  }
  getDepartments() : void
  {
    this.departmentService.getDepartments().subscribe(dep => this.departments = dep);
  }

  getDep(): void{
    this.c.getEntity<Department[]>("http://localhost:64159/api/department").subscribe(dep => this.departments = dep);
  }
  /*getStudent(): void{
    this.c.getEntity<Student[]>("http://localhost:64159/api/student").subscribe(st => this.students = st);
  }*/
}
