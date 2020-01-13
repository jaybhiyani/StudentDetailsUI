import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  getEntity<T>(url: string) : Observable<any>
  {
    return this.httpClient.get<T>(url);
  }
}
