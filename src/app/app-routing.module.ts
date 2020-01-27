import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { AddDepartmentComponent } from './department-list/add-department/add-department.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddSingleStudentComponent } from './student-list/add-student/add-single-student/add-single-student.component';
import { DepartmentDetailsComponent } from './department-list/department-details/department-details.component';


const routes: Routes = [
  {
    path: 'departments', 
    component: DepartmentListComponent,
    /*children: [
      {
        path: 'new',
        component: AddDepartmentComponent
      }
    ]*/
  },
  {path: 'departments/new', component: AddDepartmentComponent},
  {path: 'students', component: StudentListComponent},
  {path: 'students/new', component: AddSingleStudentComponent},
  {path: 'departments/:id/students', component: DepartmentDetailsComponent},
  {path: 'departments/:id/edit', component: AddDepartmentComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
