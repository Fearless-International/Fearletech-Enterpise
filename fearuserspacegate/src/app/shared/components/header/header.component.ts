import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    CommonModule,
    MatBadgeModule,
    MatMenuModule
  ]
})
export class HeaderComponent {
  @Input() drawer!: MatSidenav;
  @Input() isHandset: boolean | null = false;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  toggleSidebar(): void {
    this.drawer.toggle();
  }
  
  logout(): void {
    this.authService.logout();
    // Redirect to the React app login page
    window.location.href = window.location.origin.replace('4200', '5173');
  }
}