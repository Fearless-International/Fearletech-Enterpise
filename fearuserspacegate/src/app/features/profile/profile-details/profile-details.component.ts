import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProfileService } from '../services/profile.service';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  standalone: true,
  
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AvatarModule,
    ButtonModule,
    CardModule,
    BadgeModule,
    TabViewModule,
    ProgressSpinnerModule,
    ToastModule
  ]
})
export class ProfileDetailsComponent implements OnInit {
  user: User | null = null;
  loading: boolean = true;
  loadingStats: boolean = true;
  avatarUrl: string = '';
  activeTab: number = 0;
  
  // Real user statistics
  userStats = {
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    totalMessages: 0,
    unreadMessages: 0,
    repliedMessages: 0
  };

  // User's recent bookings
  recentBookings: any[] = [];
  
  // User's recent messages
  recentMessages: any[] = [];

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserStats();
    this.loadRecentBookings();
    this.loadRecentMessages();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.profileService.getUserProfile().subscribe({
      next: (user: User) => {
        console.log('User profile loaded:', user);
        this.user = user;
        this.setAvatarUrl();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user profile'
        });
        this.loading = false;
      }
    });
  }

  loadUserStats(): void {
    this.loadingStats = true;
    this.profileService.getUserStats().subscribe({
      next: (stats) => {
        console.log('User stats loaded:', stats);
        this.userStats = {
          totalBookings: stats.totalBookings || 0,
          completedBookings: stats.completedBookings || 0,
          pendingBookings: stats.pendingBookings || 0,
          totalMessages: stats.totalMessages || 0,
          unreadMessages: stats.unreadMessages || 0,
          repliedMessages: (stats as any).repliedMessages || 0
        };
        this.loadingStats = false;
      },
      error: (error) => {
        console.error('Error loading user stats:', error);
        // Set default values if API fails
        this.userStats = {
          totalBookings: 0,
          completedBookings: 0,
          pendingBookings: 0,
          totalMessages: 0,
          unreadMessages: 0,
          repliedMessages: 0
        };
        this.loadingStats = false;
      }
    });
  }

  loadRecentBookings(): void {
    this.profileService.getUserBookings().subscribe({
      next: (response) => {
        // Take only the 5 most recent bookings
        this.recentBookings = response.data ? response.data.slice(0, 5) : [];
        console.log('Recent bookings loaded:', this.recentBookings);
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.recentBookings = [];
      }
    });
  }

  loadRecentMessages(): void {
    this.profileService.getUserMessages().subscribe({
      next: (response) => {
        // Take only the 5 most recent messages
        this.recentMessages = response.data ? response.data.slice(0, 5) : [];
        console.log('Recent messages loaded:', this.recentMessages);
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.recentMessages = [];
      }
    });
  }

  private setAvatarUrl(): void {
    if (this.user?.avatar?.url) {
      // If there's a full URL
      this.avatarUrl = this.user.avatar.url;
    } else if (this.user?.avatar?.id) {
      // If there's just an ID, construct the URL
      this.avatarUrl = `${this.getApiBaseUrl()}/uploads/${this.user.avatar.id}`;
    } else {
      this.avatarUrl = '';
    }
  }

  private getApiBaseUrl(): string {
    // Extract base URL from environment or construct it
    const apiUrl = 'http://localhost:1337'; // Replace with your actual Strapi URL
    return apiUrl;
  }

  getInitials(): string {
    if (!this.user) return '';
    
    // Use fullName from your system table
    if (this.user.fullName) {
      const names = this.user.fullName.split(' ');
      if (names.length >= 2) {
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
      }
      return this.user.fullName.charAt(0).toUpperCase();
    }
    
    // Fallback to email
    if (this.user.email) {
      return this.user.email.charAt(0).toUpperCase();
    }
    
    return '';
  }

  getBookingStatusClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'cancelled':
        return 'text-danger';
      default:
        return '';
    }
  }

  getMessageStatusClass(status: string): string {
    switch (status) {
      case 'processed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      default:
        return '';
    }
  }

  goToEdit(): void {
    this.router.navigate(['/profile/edit']);
  }

  goToBookings(): void {
    this.router.navigate(['/bookings']);
  }

  goToMessages(): void {
    this.router.navigate(['/messages']);
  }

  logout(): void {
    this.authService.logout();
    // Redirect to the React login
    window.location.href = window.location.origin.replace('4200', '5173');
  }

  onTabChange(event: any): void {
    this.activeTab = event.index;
  }
  
  refreshData(): void {
    this.loadUserProfile();
    this.loadUserStats();
    this.loadRecentBookings();
    this.loadRecentMessages();
  }
}