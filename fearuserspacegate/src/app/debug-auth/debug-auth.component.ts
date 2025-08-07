import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-debug-auth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; background: #333; color: white;">
      <h2>Authentication Debug</h2>
      <p>Is Authenticated: {{ isAuthenticated }}</p>
      <p>Token exists: {{ hasToken }}</p>
      <p>User exists: {{ hasUser }}</p>
      <button (click)="checkAuth()">Check Auth</button>
    </div>
  `
})
export class DebugAuthComponent implements OnInit {
  isAuthenticated = false;
  hasToken = false;
  hasUser = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.hasToken = !!localStorage.getItem('token');
    this.hasUser = !!localStorage.getItem('user');
    console.log('Auth check:', {
      isAuthenticated: this.isAuthenticated,
      hasToken: this.hasToken,
      hasUser: this.hasUser,
      token: localStorage.getItem('token')
    });
  }
}