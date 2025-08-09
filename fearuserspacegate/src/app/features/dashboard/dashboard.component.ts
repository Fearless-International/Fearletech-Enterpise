import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService } from 'primeng/api';
import { DashboardService, ChartData, DashboardStats } from './services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ChartModule,
    CardModule,
    ButtonModule,
    TableModule,
    ToastModule,
    SelectButtonModule,
  ],
  providers: [MessageService],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  chartData: any;
  chartOptions: any;
  recentBookings: any[] = [];
  statistics: DashboardStats = {
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    revenue: 0,
    revenueGrowth: 0,
    bookingGrowth: 0
  };
  
  loading = false;
  periodOptions = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' }
  ];
  selectedPeriod = 'month';
  
  // Use actual current date and time
  currentTime: Date = new Date();
  // Will be populated from auth service
  currentUser: string = '';
  protected Math = Math;
  
  private subscriptions: Subscription[] = [];
  
  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}
  
  ngOnInit() {
    this.initChartOptions();
    this.loadDashboardData();
    this.startClockUpdate();
    this.getCurrentUser();
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  private getCurrentUser() {
    // Get the current user's username from the auth service
    const user = this.authService.currentUserValue;
    if (user) {
      this.currentUser = user.username || '';
    }
    
    // Subscribe to changes in case the user data updates
    this.subscriptions.push(
      this.authService.currentUser.subscribe(user => {
        if (user) {
          this.currentUser = user.username || '';
        }
      })
    );
  }
  
  private initChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#ffffff'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        y: {
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255,255,255,0.1)'
          }
        }
      }
    };
  }
  
   private loadDashboardData() {
    this.loading = true;
    
    // Get user-specific dashboard stats
    this.subscriptions.push(
      this.dashboardService.getDashboardStats().subscribe({
        next: stats => {
          this.statistics = stats;
        },
        error: error => {
          console.error('Failed to load dashboard stats:', error);
          this.showErrorToast('Failed to load dashboard statistics');
        }
      })
    );
    
    // Get user-specific chart data
    this.loadChartData();
    
    // Get user-specific recent bookings
    this.subscriptions.push(
      this.dashboardService.getRecentBookings().subscribe({
        next: bookings => {
          this.recentBookings = bookings;
          this.loading = false;
        },
        error: error => {
          console.error('Failed to load recent bookings:', error);
          this.showErrorToast('Failed to load recent bookings');
          this.loading = false;
        }
      })
    );
  }
  
  private loadChartData() {
    this.subscriptions.push(
      this.dashboardService.getChartData(this.selectedPeriod).subscribe({
        next: data => {
          this.chartData = {
            labels: data.labels,
            datasets: [
              {
                label: 'Your Bookings',
                data: data.bookings,
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.4
              },
              {
                label: 'Your Spending',
                data: data.revenue,
                fill: false,
                borderColor: '#66BB6A',
                tension: 0.4
              }
            ]
          };
        },
        error: error => {
          console.error('Failed to load chart data:', error);
          this.showErrorToast('Failed to load chart data');
        }
      })
    );
  }
  
  private startClockUpdate() {
    // Update time every second from the specified initial time
    this.subscriptions.push(
      interval(1000).subscribe(() => {
        this.currentTime = new Date(this.currentTime.getTime() + 1000);
      })
    );
  }
  
  onPeriodChange(event: any) {
    this.loadChartData();
  }
  
  manualRefresh() {
    this.loadDashboardData();
    this.messageService.add({
      severity: 'info',
      summary: 'Data Refreshed',
      detail: 'Your dashboard data has been updated'
    });
  }
  
  private showErrorToast(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}