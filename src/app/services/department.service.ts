import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  readonly rootUrl = "http://localhost:64159/api/department";
  formData :  Department;
  
  constructor(private httpClient : HttpClient) { 
    
  }
  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.rootUrl);
  }

  // postDepartment(): Observable<Department[]> {
  //   return this.httpClient.get<Department[]>(this.rootUrl + '/department')
  // }
  getDepartment(id: number): Observable<Department>
  {
    if (id === 0){
      return of(this.initializeDepartment());
    }
    const url = `${this.rootUrl}/${id}`;
    return this.httpClient.get<Department>(url)
    .pipe(
      tap(data => console.log('getDepartment: '+ JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private initializeDepartment(): Department{
    return {
      id : 0,
      dep : null,
      students: []
    };
  }
  updateDepartment(id: number,department: Department){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const url = `${this.rootUrl}/${department.id}`;
    return this.httpClient.put<Department>(url,department,{headers:headers})
    .pipe(
      tap(() => console.log("updateDepartment "+department.id)),
      map(() => department),
      catchError(this.handleError)
    );
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
  createDeparment(department: Department): Observable<Department>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post<Department>(this.rootUrl, department, {headers: headers});
  }
  deleteDepartment(id: number): Observable<{}>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.rootUrl}/${id}`;
    return this.httpClient.delete<Department>(url, {headers});
  }

  searchDepartment(searchString: string): Observable<Department[]> {
    const url = `${this.rootUrl}/search/${searchString}`;
    return this.httpClient.get<Department[]>(url)
    .pipe(
      ///tap(data => console.log('getDepartment: '+ JSON.stringify(data))),  
      catchError(this.handleError)
    );
  }
  
}
