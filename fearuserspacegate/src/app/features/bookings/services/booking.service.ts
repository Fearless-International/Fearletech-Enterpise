import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private apiService: ApiService) {}

  getBookings(filters: any = {}): Observable<Booking[]> {
    const params = {
      'populate': '*',
      'sort': 'createdAt:desc',
      ...filters
    };
    
    return this.apiService.get<any>('bookings', params).pipe(
      map(response => {
        if (response.data) {
          return response.data.map((item: any) => this.mapBookingData(item));
        }
        return [];
      })
    );
  }

  getBooking(id: number): Observable<Booking> {
    return this.apiService.get<any>(`bookings/${id}?populate=*`).pipe(
      map(response => this.mapBookingData(response.data))
    );
  }

  createBooking(bookingData: any): Observable<Booking> {
    const payload = {
      data: bookingData
    };
    
    return this.apiService.post<any>('bookings', payload).pipe(
      map(response => this.mapBookingData(response.data))
    );
  }

  updateBooking(id: number, bookingData: any): Observable<Booking> {
    const payload = {
      data: bookingData
    };
    
    return this.apiService.put<any>(`bookings/${id}`, payload).pipe(
      map(response => this.mapBookingData(response.data))
    );
  }

  deleteBooking(id: number): Observable<any> {
    return this.apiService.delete<any>(`bookings/${id}`);
  }

  private mapBookingData(data: any): Booking {
    return {
      id: data.id,
      service: data.attributes.service,
      date: data.attributes.date,
      time: data.attributes.time,
      notes: data.attributes.notes,
      status: data.attributes.status,
      user: data.attributes.user && {
        name: data.attributes.user.name,
        email: data.attributes.user.email,
        phone: data.attributes.user.phone
      },
      createdAt: data.attributes.createdAt,
      updatedAt: data.attributes.updatedAt
    };
  }
}