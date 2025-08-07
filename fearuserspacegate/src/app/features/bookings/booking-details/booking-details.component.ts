import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule
  ]
})
export class BookingDetailsComponent implements OnInit {
  bookingId: number = 0;
  booking: Booking | null = null;
  loading: boolean = true;
  
  statusOptions = [
    { label: 'Pending', value: 'pending', icon: 'pi pi-clock', color: '#ff9800' },
    { label: 'Confirmed', value: 'confirmed', icon: 'pi pi-check', color: '#2196F3' },
    { label: 'Completed', value: 'completed', icon: 'pi pi-check-circle', color: '#66BB6A' },
    { label: 'Cancelled', value: 'cancelled', icon: 'pi pi-times-circle', color: '#EF5350' }
  ];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookingId = +params['id'];
      this.loadBookingDetails();
    });
  }

  loadBookingDetails(): void {
    this.loading = true;
    this.bookingService.getBooking(this.bookingId).subscribe({
      next: (booking: Booking) => {
        this.booking = booking;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading booking details:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load booking details'
        });
        this.loading = false;
      }
    });
  }

  editBooking(): void {
    this.router.navigate(['/bookings/edit', this.bookingId]);
  }

  deleteBooking(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this booking?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookingService.deleteBooking(this.bookingId).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Booking deleted successfully'
            });
            this.router.navigate(['/bookings']);
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

  updateStatus(status: string): void {
    if (!this.booking) return;
    
    this.confirmationService.confirm({
      message: `Are you sure you want to mark this booking as ${status}?`,
      header: 'Confirm Status Change',
      icon: 'pi pi-info-circle',
      accept: () => {
        const updatedBooking = {
          ...this.booking,
          status: status
        };
        
        this.bookingService.updateBooking(this.bookingId, updatedBooking).subscribe({
          next: (response) => {
            this.booking = response;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Booking status updated to ${status}`
            });
          },
          error: (error) => {
            console.error('Error updating booking status:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update booking status'
            });
          }
        });
      }
    });
  }

  getStatusOption(status: string): any {
    return this.statusOptions.find(option => option.value === status) || this.statusOptions[0];
  }

  goBack(): void {
    this.router.navigate(['/bookings']);
  }
}