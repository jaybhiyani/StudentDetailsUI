import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  readonly rootUrl = "http://localhost:64159/api/student";
  formData :  Student
  constructor(private httpClient : HttpClient) { 
    
  }
  deleteStudent(id: number): Observable<{}>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.rootUrl}/${id}`;
    return this.httpClient.delete<Student>(url, {headers});
  }
}
