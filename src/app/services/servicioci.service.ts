import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiciociService {


  private REST_API_SERVER = "http://localhost:3000/api/";
  public datos: any;

  constructor(private httpClient: HttpClient) { }

//--Manejador de Errores HttpClient
   handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Error en el lado del Cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error en el lado del Servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
   }
//--Fin Manejador de Errores HttpClient



getIncidencias(): Observable<any>{
  return this.httpClient.get(this.REST_API_SERVER + "incidencia");
}

getNiveles(): Observable<any>{
  return this.httpClient.get(this.REST_API_SERVER + "niveles");
}



}
