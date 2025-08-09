import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  revenue: number;
  revenueGrowth: number;
  bookingGrowth: number;
}

export interface ChartData {
  labels: string[];
  bookings: number[];
  revenue: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  getDashboardStats(): Observable<DashboardStats> {
    const userId = this.authService.currentUserId;
    
    return this.apiService.get<any>(`dashboard/stats?userId=${userId}`).pipe(
      map(response => response.data || {
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        revenue: 0,
        revenueGrowth: 0,
        bookingGrowth: 0
      }),
      catchError(error => {
        console.error('Error fetching dashboard stats:', error);
        return of({
          totalBookings: 0,
          pendingBookings: 0,
          completedBookings: 0,
          revenue: 0,
          revenueGrowth: 0,
          bookingGrowth: 0
        });
      })
    );
  }

  getChartData(period: string): Observable<ChartData> {
    const userId = this.authService.currentUserId;
    
    return this.apiService.get<any>(`dashboard/chart-data?period=${period}&userId=${userId}`).pipe(
      map(response => response.data || {
        labels: [],
        bookings: [],
        revenue: []
      }),
      catchError(error => {
        console.error('Error fetching chart data:', error);
        return of({
          labels: [],
          bookings: [],
          revenue: []
        });
      })
    );
  }

  getRecentBookings(): Observable<any[]> {
    const userId = this.authService.currentUserId;
    
    return this.apiService.get<any>('bookings', {
      'populate': '*',
      'sort': 'createdAt:desc',
      'filters': {
        'user': {
          'id': {
            '$eq': userId
          }
        }
      },
      'pagination': {
        'page': 1,
        'pageSize': 5
      }
    }).pipe(
      map(response => {
        if (response.data) {
          return response.data.map((item: any) => ({
            id: item.id,
            client: item.attributes.user?.name || 'Unknown',
            date: new Date(item.attributes.date + 'T' + item.attributes.time),
            status: item.attributes.status
          }));
        }
        return [];
      }),
      catchError(error => {
        console.error('Error fetching recent bookings:', error);
        return of([]);
      })
    );
  }
}