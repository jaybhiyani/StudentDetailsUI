import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/shared/common.service';
import { Department } from 'src/app/models/department.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html'
})
export class DepartmentDetailsComponent implements OnInit {
  department: Department;
  constructor(private departmentService: DepartmentService,private router:ActivatedRoute, private route: Router, private studentService : StudentService) { }

  ngOnInit() {
    let id = +this.router.snapshot.paramMap.get('id');
    this.getDepartment(id);
  }
  getDepartment(id: number){
    this.departmentService.getDepartment(id).subscribe(department => this.department = department);
  }
  editStudent(id: number): void {
    let departmentId = this.router.snapshot.paramMap.get('id');
    //console.log(departmentId);
    this.route.navigate([`departments/${departmentId}/students/${id}/edit`]);
  }
  deleteStudent(id: number, name: string): void {
    if(confirm(`Are you sure you want to delete student: ${name}?`)){
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.refreshPage()
      });
    }
  }
  refreshPage()
  {
    let departmentId = +this.router.snapshot.paramMap.get('id');
    this.getDepartment(departmentId);
  }
}
