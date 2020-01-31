import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { CommonService } from '../services/shared/common.service';
import { Department } from '../models/department.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  id : number;
  students: Student[];
  department: Department;
  constructor(private c: CommonService, private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }
  getStudents(): void{
    this.studentService.getStudents().subscribe(students => this.students = students);
    //this.c.getEntity<Student[]>("http://localhost:64159/api/student").subscribe(student => this.students = student);
  }
  deleteStudent(id: number, name: string) {
    if(confirm(`Delete student: ${name}?`)){
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.refreshPage()
      });
    }
  }
  refreshPage(){
    this.getStudents();
  }
}
