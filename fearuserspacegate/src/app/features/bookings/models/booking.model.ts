export interface Booking {
  id: number;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  user: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
}