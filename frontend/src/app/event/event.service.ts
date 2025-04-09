import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Auth } from '../auth/auth';
import { AuthService } from '../auth/auth.service'; // Importer le service d'authentification



@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  private apiUrl = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient, private authService: AuthService, ) { }

  getAuthHeaders(): HttpHeaders {
    // Récupérer le token le plus récent à chaque requête
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  

private getRequestOptions() {
  const headers = this.getAuthHeaders();
  return { headers: headers };
}

  
  
  create(event: Event): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log('Headers:', headers);

    return this.httpClient.post(this.apiUrl + '/events/', JSON.stringify(event), this.getRequestOptions()).pipe(
        catchError(this.errorHandler)
    );
}



getAll(): Observable<any> {
  return this.httpClient.get(this.apiUrl + '/events/', this.getRequestOptions()).pipe(
      catchError(this.errorHandler)
  );
}

find(id: number): Observable<any> {
  return this.httpClient.get(this.apiUrl + "/events/" + id, this.getRequestOptions()).pipe(
      catchError(this.errorHandler)
  );
}

update(id: number, auth: Auth): Observable<any> {
  return this.httpClient.put(this.apiUrl + "/events/" + id, JSON.stringify(auth), this.getRequestOptions()).pipe(
      catchError(this.errorHandler)
  );
}

delete(id: number) {
  return this.httpClient.delete(this.apiUrl + "/events/" + id, this.getRequestOptions()).pipe(
      catchError(this.errorHandler)
  );
}


createRegistration(id: number): Observable<any> {
  return this.httpClient.post(
    `${this.apiUrl}/events/${id}/register`,
    {}, 
    this.getRequestOptions()
  ).pipe(
    catchError(this.errorHandler)
  );
}

getUserRole(): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}/user/role`, this.getRequestOptions()).pipe(
      catchError(this.errorHandler)
  );
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

  
}

  


