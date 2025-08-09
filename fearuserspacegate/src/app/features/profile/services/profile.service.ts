import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user';

export interface UserStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalMessages: number;
  unreadMessages: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  // If you need to update this service too
getUserProfile(): Observable<User> {
  return this.authService.getUserProfile().pipe(
    catchError(error => {
      console.error('Error fetching user profile in profile service:', error);
      return throwError(() => new Error('Failed to load your profile information'));
    })
  );
}

  updateProfile(userData: Partial<User>): Observable<User> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return throwError(() => new Error('You must be logged in to update your profile'));
    }
    
    const payload = {
      data: userData
    };
    
    // CHANGED: Update to use system endpoint instead of users
    return this.apiService.put<any>(`systems/${userId}`, payload).pipe(
      map(response => response.data || response),
      tap(user => {
        // Update local storage and auth service
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...user };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.authService.updateCurrentUser(updatedUser);
        }
      }),
      catchError(error => {
        console.error('Error updating profile:', error);
        return throwError(() => new Error('Failed to update your profile information'));
      })
    );
  }

  updatePassword(currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    if (!this.authService.currentUserValue?.id) {
      return throwError(() => new Error('You must be logged in to change your password'));
    }
    
    // CHANGED: Use your custom auth endpoint
    const payload = {
      data: {
        email: this.authService.currentUserValue.email,
        password: newPassword,
        token: 'temp-token' // You might need to implement a proper reset flow
      }
    };
    
    // You might need to create a custom endpoint for password change
    // For now, this uses the reset password endpoint
    return this.apiService.post<any>('auth/reset-password', payload).pipe(
      catchError(error => {
        console.error('Error changing password:', error);
        
        // Handle specific error cases
        if (error.status === 401) {
          return throwError(() => new Error('Current password is incorrect'));
        }
        
        return throwError(() => new Error('Failed to update your password'));
      })
    );
  }

  uploadAvatar(file: File): Observable<any> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return throwError(() => new Error('You must be logged in to upload an avatar'));
    }
    
    const formData = new FormData();
    formData.append('files', file);
    formData.append('ref', 'api::system.system'); // CHANGED: Use system instead of user
    formData.append('refId', userId.toString());
    formData.append('field', 'avatar');
    
    return this.apiService.upload<any>('upload', formData).pipe(
      catchError(error => {
        console.error('Error uploading avatar:', error);
        return throwError(() => new Error('Failed to upload your profile image'));
      })
    );
  }

  // Get security settings for the current user
  getSecuritySettings(): Observable<any> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return throwError(() => new Error('You must be logged in to view security settings'));
    }
    
    // You might need to implement this endpoint in your system controller
    return this.apiService.get<any>(`systems/${userId}`).pipe(
      map(response => ({
        twoFactorEnabled: false, // Add these fields to your system model if needed
        emailNotifications: true,
        smsNotifications: false
      })),
      catchError(error => {
        console.error('Error fetching security settings:', error);
        return throwError(() => new Error('Failed to load your security settings'));
      })
    );
  }

  // Update security settings (e.g., two-factor authentication)
  updateSecuritySettings(settings: any): Observable<any> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return throwError(() => new Error('You must be logged in to update security settings'));
    }
    
    return this.apiService.put<any>(`systems/${userId}`, { data: settings }).pipe(
      catchError(error => {
        console.error('Error updating security settings:', error);
        return throwError(() => new Error('Failed to update your security settings'));
      })
    );
  }

// Update the getUserStats method in profile.service.ts:

getUserStats(): Observable<UserStats> {
  const userId = this.authService.currentUserValue?.id;
  if (!userId) {
    return throwError((): Error => new Error('You must be logged in to view statistics'));
  }

  // Call the new system endpoint
  return this.apiService.get<any>('system/user-stats').pipe(
    map((response) => ({
      totalBookings: response.totalBookings || 0,
      completedBookings: response.completedBookings || 0,
      pendingBookings: response.pendingBookings || 0,
      totalMessages: response.totalMessages || 0,
      unreadMessages: response.unreadMessages || 0,
      repliedMessages: response.repliedMessages || 0
    })),
    catchError(error => {
      console.error('Error fetching user stats:', error);
      // Return default values if API fails
      return of({
        totalBookings: 0,
        completedBookings: 0,
        pendingBookings: 0,
        totalMessages: 0,
        unreadMessages: 0,
        repliedMessages: 0
      });
    })
  );
}

  // Get user bookings
  getUserBookings(): Observable<any> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return throwError(() => new Error('You must be logged in to view bookings'));
    }

    return this.apiService.get<any>('bookings?populate=*').pipe(
      catchError(error => {
        console.error('Error fetching user bookings:', error);
        return throwError(() => new Error('Failed to load your bookings'));
      })
    );
  }

  // Get user messages/contacts
  getUserMessages(): Observable<any> {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return throwError(() => new Error('You must be logged in to view messages'));
    }

    return this.apiService.get<any>('contacts?populate=*').pipe(
      catchError(error => {
        console.error('Error fetching user messages:', error);
        return throwError(() => new Error('Failed to load your messages'));
      })
    );
  }
}