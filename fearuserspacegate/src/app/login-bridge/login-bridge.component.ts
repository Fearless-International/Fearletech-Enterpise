import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-bridge',
  standalone: true,
  template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #121212; color: white;">
      <div style="text-align: center;">
        <h2>Completing Login...</h2>
        <p>Please wait while we redirect you to the dashboard.</p>
        <div>Status: {{status}}</div>
      </div>
    </div>
  `
})
export class LoginBridgeComponent implements OnInit {
  status: string = 'Checking login...';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userData = urlParams.get('userData');

    this.status = 'Processing login data...';

    if (token && userData) {
      try {
        // Save token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', userData);
        
        this.status = 'Login data saved, redirecting...';
        
        // Redirect to dashboard
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } catch (error) {
        console.error('Error saving login data:', error);
        this.status = 'Error: Failed to save login data';
      }
    } else {
      this.status = 'Error: Missing login data';
    }
  }
}