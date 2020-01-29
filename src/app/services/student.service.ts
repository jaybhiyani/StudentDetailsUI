import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
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
  getStudent(id: number): Observable<Student> {
    const url = `${this.rootUrl}/${id}`;
    return this.httpClient.get<Student>(url);
  }
  editStudent(id: number, student: Student) : Observable<Student>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const url = `${this.rootUrl}/${id}`;
    return this.httpClient.put<Student>(url, student, {headers: headers})
    .pipe(
      map(() => student),
      catchError(this.handleError)
    );
  }
  addStudent(student: Student): Observable<Student>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post<Student>(this.rootUrl, student, {headers: headers});
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    //console.error(err);
    return throwError(errorMessage);
  }
}
