import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailsComponent } from './department-list/department-details/department-details.component';
//import { DepartmentService } from './services/department.service';
import {HttpClientModule} from '@angular/common/http';
import { AddDepartmentComponent } from './department-list/add-department/add-department.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from './student-list/student-list.component';
import { AddSingleStudentComponent } from './student-list/add-single-student/add-single-student.component';
import { EditStudentComponent } from './student-list/edit-student/edit-student.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentListComponent,
    DepartmentDetailsComponent,
    AddDepartmentComponent,
    StudentListComponent,
    AddSingleStudentComponent,
    EditStudentComponent
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  //providers: [DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
