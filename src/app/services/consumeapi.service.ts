import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getMethod, postMethod } from "../global_interfaces/consume.api"

@Injectable({
  providedIn: 'root'
})
export class ConsumeapiService {

  constructor(
    private http: HttpClient
  ) { }

  getService(endpoint: string): Observable<getMethod>{
    return this.http.get<getMethod>("http://127.0.0.1:8000/api/" + endpoint)
  }

  postService(endpoint: string, obj: any): Observable<postMethod>{
    return this.http.post<postMethod>("http://127.0.0.1:8000/api/"+endpoint, obj);
  }
}
