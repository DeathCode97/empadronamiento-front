import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getMethod, postMethod } from "../global_interfaces/consume.api"
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

export class AuthApiService {

  private apiUrl = 'http://127.0.0.1:8000/api/login'; // URL de API Laravel

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: {email: string, password: string}): Observable<any>{
    return this.http.post(this.apiUrl, credentials);
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('userAuth');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !new JwtHelperService().isTokenExpired(token) : false;
  }


}

