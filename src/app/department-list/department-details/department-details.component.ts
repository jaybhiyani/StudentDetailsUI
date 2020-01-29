import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/shared/common.service';
import { Department } from 'src/app/models/department.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  department: Department;
  constructor(private c:CommonService,private router:ActivatedRoute, private route: Router, private studentService : StudentService) { }

  ngOnInit() {
    let id = +this.router.snapshot.paramMap.get('id');
    this.getStudents(id);
  }
  getStudents(id: number){
    this.c.getSingleEntity<Department>(id,"http://localhost:64159/api/department").subscribe(dep => this.department = dep);
  }
  editStudent(id: number): void {
    let departmentId = this.router.snapshot.paramMap.get('id');
    //console.log(departmentId);
    this.route.navigate([`departments/${departmentId}/students/${id}/edit`]);
  }
  deleteStudent(id: number, name: string): void {
    if(confirm(`Delete student: ${name}?`)){
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.refreshPage()
      });
    }
  }
  refreshPage()
  {
    let departmentId = +this.router.snapshot.paramMap.get('id');
    this.getStudents(departmentId);
  }
}
