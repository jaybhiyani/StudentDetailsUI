import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/shared/common.service';
import { Department } from 'src/app/models/department.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  department: Department;
  constructor(private c:CommonService,private router:ActivatedRoute) { }

  ngOnInit() {
    let id = +this.router.snapshot.paramMap.get('id');
    this.getStudents(id);
  }
  getStudents(id: number){
    this.c.getSingleEntity<Department>(id,"http://localhost:64159/api/department").subscribe(dep => this.department = dep);
  }
}
