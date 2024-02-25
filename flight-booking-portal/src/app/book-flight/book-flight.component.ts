import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from '../api/models/flight';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewBook } from '../api/models';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
})
export class BookFlightComponent {
  flightId: number = 0;
  flight: Flight = {};
  form: FormGroup = new FormGroup({});

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private flightService: FlightService
  ) {
    this.initBookFlight();
    this.form = this.fb.group({ numberOfSeats: [1] });
  }

  get numberOfSeats() { return this.form.get('numberOfSeats')?.value; }

  book() {
    if (this.authService.currentUser === null) { 
      this.router.navigate(['/register-passenger']); 
      return; 
    }

    const booking: NewBook = {
      flightId: this.flightId,
      passengerEmail: this.authService.currentUser?.email,
      numberOfSeats: this.numberOfSeats
    }
    this.flightService.bookFlight({ body: booking })
      .subscribe(_ => this.router.navigate(['/my-bookings']));
  }

  private initBookFlight() {
    if (!this.authService.currentUser){ this.router.navigate(['/register-passenger']) };
    this.activeRoute.paramMap.subscribe(params => this.flightId = +(params.get('flightId') ?? 0));
    this.flightService.findFlight({id: this.flightId}).subscribe(flight => {
      if (flight === null) { this.router.navigate(['/search-flights']); }
      else { this.flight = flight; } 
    });
  }
}
