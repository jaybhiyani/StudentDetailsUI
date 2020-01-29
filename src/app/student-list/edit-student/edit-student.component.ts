import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  studentEditForm: FormGroup;
  student: Student;
  errorMessage: string;

  constructor(private fb: FormBuilder, private studentService: StudentService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.studentEditForm = this.fb.group({
      sId: 0,
      name: '',
      departmentId: 0
    });
    let id = this.getIdFromUrl();
    this.getStudent(id);
  }
  getIdFromUrl(): number{
    let id = +this.activatedRoute.snapshot.paramMap.get('sId');
    return id;
  }
  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe({
      next: (student: Student) => this.displayStudent(student),
      error: err => this.errorMessage = err
    })
  }
  displayStudent(filledStudent: Student){
    if(this.studentEditForm){
      this.studentEditForm.reset();
    }
    this.student = filledStudent;
    this.studentEditForm.patchValue({
      sId: this.student.sId,
      name: this.student.name,
      departmentId: this.student.departmentId
    });
  }
  save(){
    if(this.studentEditForm.valid){
      if(this.studentEditForm.dirty){
        const s = { ...this.student, ...this.studentEditForm.value };
        let id = this.getIdFromUrl();
        this.studentService.editStudent(id, s).subscribe({
          next: () => this.onSaveComplete(),
          error: err => console.log(err)
        });
      }
    }
  }
  onSaveComplete(): void {
    this.studentEditForm.reset();
    let departmentId = +this.activatedRoute.snapshot.paramMap.get('id');
    if(departmentId !== 0){
      this.router.navigate([`/departments/${departmentId}/students`]);
    }
    else{
      let studentId = +this.activatedRoute.snapshot.paramMap.get('sId');
      this.router.navigate([`/students`]);
    }
  }

}
