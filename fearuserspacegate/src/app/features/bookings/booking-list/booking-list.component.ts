import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';
import{CommonModule} from '@angular/common';
// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  standalone: true,
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    CardModule,
    PaginatorModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    TooltipModule,
    FormsModule
  ]
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  
  statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' }
  ];
  
  selectedStatus: string = '';
  searchQuery: string = '';

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(page: number = 0): void {
    this.loading = true;
    
    const filters: any = {
      'pagination[page]': page + 1,
      'pagination[pageSize]': this.rows
    };
    
    if (this.selectedStatus) {
      filters['filters[status][$eq]'] = this.selectedStatus;
    }
    
    if (this.searchQuery) {
      filters['filters[$or][0][user.name][$containsi]'] = this.searchQuery;
      filters['filters[$or][1][user.email][$containsi]'] = this.searchQuery;
      filters['filters[$or][2][service][$containsi]'] = this.searchQuery;
    }
    
    this.bookingService.getBookings(filters).subscribe({
      next: (response: any) => {
        this.bookings = response.data;
        this.totalRecords = response.meta.pagination.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load bookings. Please try again.'
        });
        this.loading = false;
      }
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.loadBookings(event.page);
  }

  onStatusChange(): void {
    this.first = 0;
    this.loadBookings(0);
  }

  onSearch(): void {
    this.first = 0;
    this.loadBookings(0);
  }
  
  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  viewBooking(id: number): void {
    this.router.navigate(['/bookings', id]);
  }

  editBooking(id: number): void {
    this.router.navigate(['/bookings/edit', id]);
  }

  deleteBooking(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this booking?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookingService.deleteBooking(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Booking deleted successfully'
            });
            this.loadBookings(Math.floor(this.first / this.rows));
          },
          error: (error) => {
            console.error('Error deleting booking:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete booking'
            });
          }
        });
      }
    });
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
}