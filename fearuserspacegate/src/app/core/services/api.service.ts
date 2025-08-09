import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Update the getAuthHeaders method in api.service.ts
private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token'); // Make sure this matches how you store it
  
  // Log the token for debugging
  console.log('API Service - Token being used:', token ? token.substring(0, 15) + '...' : 'No token');
  
  return new HttpHeaders({
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  });
}

  get<T>(path: string, params: any = {}): Observable<T> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    return this.http.get<T>(`${this.apiUrl}/${path}`, { 
      params: httpParams,
      headers: this.getAuthHeaders()
    });
  }

  post<T>(path: string, body: any = {}): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${path}`, body, {
      headers: this.getAuthHeaders()
    });
  }

  put<T>(path: string, body: any = {}): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${path}`, body, {
      headers: this.getAuthHeaders()
    });
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${path}`, {
      headers: this.getAuthHeaders()
    });
  }

  upload<T>(path: string, formData: FormData): Observable<T> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.post<T>(`${this.apiUrl}/${path}`, formData, {
      headers
    });
  }
}