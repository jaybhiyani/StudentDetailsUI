import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { CommonService } from '../services/shared/common.service';
import { Department } from '../models/department.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  id : number;
  students: Student[];
  department: Department;
  constructor(private c: CommonService) { }

  ngOnInit() {
    this.getStudents();
    //this.getDepartmentForStudent(this.id);
  }
  getStudents(): void{
    this.c.getEntity<Student[]>("http://localhost:64159/api/student").subscribe(student => this.students = student);
  }
  // getDepartmentForStudent(id: number)
  // {
  //   this.c.getSingleEntity<Department>(id,"http://localhost:64159/api/department").subscribe(department => this.department = department);
  // }
}
