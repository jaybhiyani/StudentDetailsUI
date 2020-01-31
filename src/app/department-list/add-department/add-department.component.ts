import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html'
})
export class AddDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  changesMade: boolean = false;
  department: Department;
  errorMessage: string;
  pageTitle = "Add New Department";

  
  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private studentService: StudentService, private router: ActivatedRoute, private route: Router) {

  }

  ngOnInit() {
    this.departmentForm = this.fb.group({
      dep: ['', [Validators.required, Validators.minLength(3)]],
      students: this.fb.array([])
    });
    let id = +this.router.snapshot.paramMap.get('id');
    this.getDepartment(id);
  }
  save() {
    if (this.departmentForm.valid) {
      if (this.departmentForm.dirty || this.changesMade) {
        const d = { ...this.department, ...this.departmentForm.value };

        if (d.id === 0) {
          this.departmentService.createDeparment(d)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          let id = +this.router.snapshot.paramMap.get('id');
          this.departmentService.updateDepartment(id, d)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      }
    }
  }
  buildStudent(): FormGroup {
    return this.fb.group({
      sId: [0],
      name: [''],
      departmentId: [0]
    });
  }

  pushStudent(): void {
    (this.departmentForm.controls.students as FormArray).push(this.buildStudent());
  }

  popStudent(studentId: number, studentName: string, index: number) {
    this.changesMade = true;
    console.log(studentId);
    if (studentId != 0) {
      if (confirm(`Are you sure you want to delete student : ${studentName}?`)) {
        this.studentService.deleteStudent(studentId).subscribe();
        (this.departmentForm.controls.students as FormArray).removeAt(index);
      }
    } else {
      (this.departmentForm.controls.students as FormArray).removeAt(index);
    }

  }

  getDepartment(id: number) {
    this.departmentService.getDepartment(id).subscribe({
      next: (dept: Department) => this.displayDepartment(dept),
      error: err => this.errorMessage = err
    });
  }
  displayDepartment(dep: Department) {
    if (this.departmentForm) {
      this.departmentForm.reset();
    }
    this.department = dep;

    if (this.department.id == 0) {
      this.pageTitle = "Add New Department";
    }
    else {
      this.pageTitle = "Edit Department: " + this.department.dep;
      this.departmentForm.patchValue({
        dep: this.department.dep
      });
      this.department.students.forEach(student => {
        (this.departmentForm.controls.students as FormArray).push(
          this.fb.group({
            sId: [student.sId],
            name: [student.name, Validators.required],
            departmentId: [student.departmentId]
          })
        )
      });
    }
  }
  onSaveComplete() {
    this.departmentForm.reset();
    this.route.navigate(['/departments']);
  }
}
