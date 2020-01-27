import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  urlWithParam: string;
  constructor(private httpClient: HttpClient) { }

  getEntity<T>(url: string) : Observable<any>
  {
    return this.httpClient.get<T>(url);
  }
  getSingleEntity<T>(id: number, url: string){
    this.urlWithParam = `${url}/${id}`;
    console.log(this.urlWithParam);
    return this.httpClient.get<T>(this.urlWithParam);
  }
}
