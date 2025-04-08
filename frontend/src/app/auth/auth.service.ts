
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Auth } from './auth';


@Injectable({
  providedIn: 'root'
})
export class  AuthService {
  
  
  private apiUrl = "http://localhost:8000/api";
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private httpClient: HttpClient) {
   }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
     'Accept': 'application/json'
    })
  }

 
  inscription(auth: Auth): Observable<any>{
    return this.httpClient.post(this.apiUrl +'/register/',
    JSON.stringify(auth), this.httpOptions).pipe(
    catchError(this.errorHandler));
  }


  connexion(auth: Auth): Observable<any>{
    return this.httpClient.post(this.apiUrl + '/login/',
    JSON.stringify(auth), this.httpOptions).pipe(
    catchError(this.errorHandler));
  }

  errorHandler(error: any){
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code : ${error.status} \nMessage :
      ${error.message}`
    }
    return throwError(errorMessage);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }




  
  
  

}