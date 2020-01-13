import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { AddDepartmentComponent } from './department-list/add-department/add-department.component';


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
  {path: 'students', component: DepartmentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
