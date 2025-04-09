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
      
    
    });
  }
  
  

private getRequestOptions() {
  const headers = this.getAuthHeaders();
  return { headers: headers };
}

  
  
  create(eventData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log('Headers:', headers);

    return this.httpClient.post(this.apiUrl + '/events/', eventData, {
      headers: headers // pas de Content-Type ici
    });
    
}



getAll(date?: string, lieu?: string, categorie?: string): Observable<any> {
  let url = this.apiUrl + '/events/';
  const params: any = {};

  if (date) {
    params.date = date;
  }
  if (lieu) {
    params.lieu = lieu;
  }
  if (categorie) {
    params.categorie = categorie;
  }

  if (Object.keys(params).length > 0) {
    url += '?' + new URLSearchParams(params).toString();
  }

  return this.httpClient.get(url, this.getRequestOptions()).pipe(
    catchError(this.errorHandler)
  );
}


find(id: number): Observable<any> {
  return this.httpClient.get(this.apiUrl + "/events/" + id, this.getRequestOptions()).pipe(
      catchError(this.errorHandler)
  );
}

update(id: number, formData: FormData): Observable<any> {
  return this.httpClient.put(this.apiUrl + "/events/" + id, formData, this.getRequestOptions()).pipe(
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
    catchError(
      this.errorHandler)
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

  


