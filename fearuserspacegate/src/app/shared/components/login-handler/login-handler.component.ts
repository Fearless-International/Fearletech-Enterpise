import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-login-handler',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="login-handler">
      <mat-spinner diameter="50"></mat-spinner>
      <p>Authenticating, please wait...</p>
    </div>
  `,
  styles: [`
    .login-handler {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #121212;
      color: white;
    }
    
    p {
      margin-top: 20px;
      font-size: 18px;
    }
  `]
})
export class LoginHandlerComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    console.log('Login handler initialized');
    
    // Check for token in localStorage (passed from React app)
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        const success = this.authService.login(token, user);
        
        if (success) {
          console.log('Authentication successful, redirecting to dashboard');
          // Redirect to dashboard by default
          this.router.navigate(['/dashboard']);
        } else {
          this.handleAuthFailure('Login failed');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.handleAuthFailure('Invalid user data');
      }
    } else {
      this.handleAuthFailure('No authentication token found');
    }
  }
  
  private handleAuthFailure(reason: string): void {
    console.error('Authentication failed:', reason);
    
    // Clear any existing tokens
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect back to React login
    const reactAppUrl = window.location.origin.replace('4200', '5173');
    window.location.href = `${reactAppUrl}/sign-in`;
  }
}