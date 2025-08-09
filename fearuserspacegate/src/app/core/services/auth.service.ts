import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // New helper method to get current user ID
  public get currentUserId(): number | null {
    return this.currentUserValue?.id || null;
  }

  login(token: string, user: User): boolean {
    if (!token || !user) {
      return false;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  updateCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // DEBUG VERSION to find the issue
  isAuthenticated(): boolean {
    console.log('localStorage contents:', {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user')
    });
    
    const token = localStorage.getItem('token');
    console.log('Token check:', token ? 'Token exists' : 'No token');
    
    if (!token) {
      return false;
    }
    
    try {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      console.log('Token expired:', isExpired);
      return !isExpired;
    } catch (error) {
      console.error('Error checking token:', error);
      return false;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    
    try {
      return this.jwtHelper.isTokenExpired(token);
    } catch {
      return true;
    }
  }

  // Add this debugging method to auth.service.ts
  checkAuthState(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log('Auth state check:', {
      hasToken: !!token,
      hasUser: !!user,
      tokenValid: token ? !this.jwtHelper.isTokenExpired(token) : false
    });
  }

// Update the getUserProfile method in auth.service.ts:

getUserProfile(): Observable<User> {
  const token = this.getToken();
  console.log('Getting user profile with token:', token ? 'Token exists' : 'No token');
  
  // CHANGED: Use /system/me instead of /auth/me
  return this.http.get<any>(`${environment.apiUrl}/system/me`, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }).pipe(
    map(response => {
      // Map the response to match your User model
      const user: User = {
        id: response.id,
        email: response.email,
        fullName: response.fullName,
        firstName: response.fullName?.split(' ')[0] || '',
        lastName: response.fullName?.split(' ').slice(1).join(' ') || '',
        username: response.email, // or however you want to handle this
        verified: response.verified,
        avatar: response.avatar || null,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt
      };
      return user;
    }),
    tap(user => {
      console.log('User profile fetched successfully:', user);
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }),
    catchError(error => {
      console.error('Error fetching user profile:', error);
      if (error.status === 401) {
        console.log('Token in localStorage:', localStorage.getItem('token'));
        console.log('Token from getToken():', this.getToken());
      }
      return throwError(() => error);
    })
  );
}

// Update test method as well
testApiConnection(): void {
  const token = this.getToken();
  console.log('Test API connection with token:', token);
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  
  // CHANGED: Use /system/me
  this.http.get(`${environment.apiUrl}/system/me`, { headers })
    .subscribe({
      next: (response) => console.log('API test successful:', response),
      error: (error) => {
        console.error('API test failed:', error);
        console.log('Headers sent:', headers);
        console.log('Full error:', JSON.stringify(error));
      }
    });
}
};