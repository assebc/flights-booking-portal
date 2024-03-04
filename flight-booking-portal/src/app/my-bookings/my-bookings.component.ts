import { Component } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { BookingService } from '../api/services/booking.service';
import { BookDto, BookingRm } from '../api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent {

  bookings: BookingRm[] = [];

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {
    if(!this.authService.currentUser) { 
      this.router.navigate(['/register-passenger']); 
      return; 
    }

    this.bookingService.listBooking({ email: this.authService.currentUser?.email })
      .subscribe(r => this.bookings = r);
  }

  cancel(booking: BookingRm) {
    const dto: BookDto = {
      flightId: booking.flightId,
      numberOfSeats: booking.numberOfSeats,
      passengerEmail: booking.passengerEmail
    };

    this.bookingService.cancelBooking({ body: dto })
      .subscribe((_: any) => this.bookings = this.bookings.filter(b => b != booking));
  }

}