import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { AddStudentComponent } from 'src/app/student-list/add-student/add-student.component';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { isNullOrUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  changesMade: boolean = false;
  //Department = new Department();
  department: Department;
  private sub = Subscription;
  errorMessage: any;
  pageTitle = "Add New Department";

  // get students(): FormArray {
  //   return <FormArray>this.departmentForm.get('students');
  // }
  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private studentService: StudentService, private router: ActivatedRoute, private route: Router) {

  }

  ngOnInit() {
    this.departmentForm = this.fb.group({
      dep: ['', [Validators.required, Validators.minLength(3)]],
      students: this.fb.array([
        //this.buildStudent()
      ])
    });
    console.log(this.departmentForm);
    let id = +this.router.snapshot.paramMap.get('id');
    this.getDepartment(id);
  }
  save() {
    console.log(this.departmentForm.value);
    if (this.departmentForm.valid) {
      if (this.departmentForm.dirty || this.changesMade) {
        const d = { ...this.department, ...this.departmentForm.value };
        console.log(d);

        if (d.id === 0) {
          // console.log("Create Product Implementation");
          this.departmentService.createDeparment(d)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => console.log(err)
          });
        } else {
          let id = +this.router.snapshot.paramMap.get('id');
          console.log(id);
          this.departmentService.updateDepartment(id, d)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => console.log(err)
            });
        }
      }
    }
  }
  buildStudent(): FormGroup {
    return this.fb.group({
      sId: 0,
      name: '',
      departmentId: 0
    });
  }

  pushStudent(): void {
    (this.departmentForm.controls.students as FormArray).push(this.buildStudent());
  }

  popStudent(studentId: number, studentName: string, index: number) {
    this.changesMade = true;
    console.log(studentId);
    if (studentId.toString() !== '') {
      if (confirm(`Delete Student : ${studentName}?`)) {
        this.studentService.deleteStudent(studentId).subscribe();
        console.log(`${studentName} deleted`);
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

    if (this.department.id === 0) {
      this.pageTitle = "Add New Department";
    }
    else {
      this.pageTitle = "Edit Department: " + this.department.dep;
      this.departmentForm.patchValue({
        dep: this.department.dep
      });
      //this.departmentForm.setControl('students',this.fb.array(this.department.students || []));
      this.department.students.forEach(student => {
        (this.departmentForm.controls.students as FormArray).push(
          this.fb.group({
            sId: [student.sId],
            name: [student.name, Validators.required],
            departmentId: [student.departmentId]
          })
        )
      });
      console.log(this.departmentForm.controls.students);
    }

  }
  onSaveComplete() {
    this.departmentForm.reset();
    this.route.navigate(['/departments']);
  }
}
