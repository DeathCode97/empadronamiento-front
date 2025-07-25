import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError  } from 'rxjs';
import { getMethod, postMethod } from "../global_interfaces/consume.api"

@Injectable({
  providedIn: 'root'
})
export class ConsumeapiService {

  constructor(
    private http: HttpClient
  ) { }

  private getToken(): string | null {
    return localStorage.getItem('token'); // Asegúrate de que el token está correctamente almacenado
  }


  getService(endpoint: string): Observable<getMethod>{
    return this.http.get<getMethod>("https://192.168.191.7:81/api/" + endpoint)
  }

  postService(endpoint: string, obj: any): Observable<postMethod>{
    const token = this.getToken();
    // console.log(token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<postMethod>("https://192.168.191.7:81/api/"+endpoint, obj, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del cliente:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Código del error: ${error.status}, mensaje: ${error.message}`);
    }

    console.log(error,  'xdxdxd');

    // Puedes retornar un mensaje personalizado al usuario
    return throwError(() => new Error('Ocurrió un error en la solicitud. Inténtalo de nuevo más tarde.'));
  }

}
