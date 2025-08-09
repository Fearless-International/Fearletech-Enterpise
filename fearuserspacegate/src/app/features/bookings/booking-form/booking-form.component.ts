import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Your Component
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputTextarea,
    ButtonModule,
    CardModule,
    ToastModule,
    MessagesModule,
    ConfirmDialogModule,
  ]
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  isEditMode: boolean = false;
  bookingId: number | null = null;
  isSubmitting: boolean = false;
  currentDate: Date = new Date();
  
  services = [
    { value: 'haircut', label: 'Haircut' },
    { value: 'coloring', label: 'Hair Coloring' },
    { value: 'styling', label: 'Hair Styling' },
    { value: 'treatment', label: 'Hair Treatment' }
  ];
  
  statuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.bookingForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.bookingId = +params['id'];
        this.loadBooking(this.bookingId);
      } else {
        // Pre-fill user details in create mode
        const user = this.authService.currentUserValue;
        if (user) {
          this.bookingForm.patchValue({
            userName: user.username || '',
            userEmail: user.email || '',
            userPhone: user.phone || ''
          });
        }
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      service: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      notes: [''],
      status: ['pending', Validators.required]
    });
  }

  loadBooking(id: number): void {
    this.bookingService.getBooking(id).subscribe({
      next: (booking: Booking) => {
        // Parse date string to Date object
        const bookingDate = booking.date ? new Date(booking.date) : null;
        
        // Parse time string
        let hours = 0;
        let minutes = 0;
        if (booking.time) {
          const timeParts = booking.time.split(':');
          if (timeParts.length >= 2) {
            hours = parseInt(timeParts[0], 10);
            minutes = parseInt(timeParts[1], 10);
          }
        }
        
        // Update form with booking data
        this.bookingForm.patchValue({
          service: booking.service,
          date: bookingDate,
          time: hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0'),
          userName: booking.user?.name || '',
          userEmail: booking.user?.email || '',
          userPhone: booking.user?.phone || '',
          notes: booking.notes,
          status: booking.status
        });
      },
      error: (error) => {
        console.error('Error loading booking:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load booking details'
        });
        this.router.navigate(['/bookings']);
      }
    });
  }

  onSubmit(): void {
    if (this.bookingForm.invalid || this.isSubmitting) {
      this.markFormGroupTouched(this.bookingForm);
      return;
    }
    
    this.isSubmitting = true;
    const formValues = this.bookingForm.value;
    
    // Format date
    const dateValue = formValues.date instanceof Date ? formValues.date : new Date(formValues.date);
    const formattedDate = this.formatDate(dateValue);
    
    // Format time with milliseconds
    const formattedTime = this.formatTimeWithMilliseconds(formValues.time);
    
    const bookingData = {
      service: formValues.service,
      date: formattedDate,
      time: formattedTime,
      notes: formValues.notes,
      status: formValues.status,
      user: {
        name: formValues.userName,
        email: formValues.userEmail,
        phone: formValues.userPhone
      }
    };
    
    if (this.isEditMode && this.bookingId) {
      this.updateBooking(this.bookingId, bookingData);
    } else {
      this.createBooking(bookingData);
    }
  }

  private createBooking(bookingData: any): void {
    this.bookingService.createBooking(bookingData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Booking created successfully'
        });
        this.isSubmitting = false;
        this.router.navigate(['/bookings']);
      },
      error: (error) => {
        console.error('Error creating booking:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create booking'
        });
        this.isSubmitting = false;
      }
    });
  }

  private updateBooking(id: number, bookingData: any): void {
    this.bookingService.updateBooking(id, bookingData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Booking updated successfully'
        });
        this.isSubmitting = false;
        this.router.navigate(['/bookings']);
      },
      error: (error) => {
        console.error('Error updating booking:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update booking'
        });
        this.isSubmitting = false;
      }
    });
  }

  private formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date provided');
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  private formatTimeWithMilliseconds(time: string): string {
    if (!time) {
      throw new Error('Time is required');
    }
    // Validate the time format using a regular expression
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(time)) {
      throw new Error('Invalid time format, expected HH:mm');
    }
    return `${time}:00.000`;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.bookingForm.get(controlName);
    
    if (!control) return '';
    
    if (control.hasError('required')) {
      return 'This field is required';
    }
    
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (control.hasError('pattern')) {
      if (controlName === 'userPhone') {
        return 'Please enter a valid 10-digit phone number';
      }
      return 'Invalid format';
    }
    
    return '';
  }

  cancel(): void {
    this.router.navigate(['/bookings']);
  }
}