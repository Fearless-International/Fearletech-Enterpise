import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService  ) {}
  
  canActivate(): boolean {
    console.log('AuthGuard: Checking authentication');
    
    // Simple authentication check
    if (this.authService.isAuthenticated()) {
      console.log('AuthGuard: User is authenticated');
      return true;
    }
    
    // If not authenticated, redirect to React login
    console.log('AuthGuard: User is not authenticated, redirecting to login');
    window.location.href = 'http://localhost:5173/sign-in';
    return false;
  }
}