import { Injectable } from '@angular/core';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  readonly rootUrl = "http://localhost:64159/api";
  formData :  Department
  constructor(private httpClient : HttpClient) { 
    
  }
  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.rootUrl + '/department')
  }

  postDepartment(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.rootUrl + '/department')
  }
  
}
