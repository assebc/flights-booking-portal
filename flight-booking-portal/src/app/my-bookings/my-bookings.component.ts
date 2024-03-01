import { Component } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { NewBook } from '../api/models';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent {

  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.bookingService.listBooking({ email: this.authService.currentUser?.email ?? '' })
      .subscribe(r => this.bookings = r);
  }

  cancel(booking: Booking) {
    const dto: NewBook = {
      flightId: booking.flightId,
      numberOfSeats: booking.numberOfBookedSeats,
      passengerEmail: booking.passengerEmail
    };

    this.bookingService.cancelBooking({ body: dto })
      .subscribe((_: any) => this.bookings = this.bookings.filter(b => b != booking));
  }

}