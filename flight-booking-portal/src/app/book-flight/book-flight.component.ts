import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookDto, FlightRm } from '../api/models';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
})
export class BookFlightComponent implements OnInit{
  flightId: number = 0;
  flight: FlightRm = {};
  form: FormGroup = new FormGroup({});

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.initBookFlight();
    this.form = this.fb.group({ numberOfSeats: [1, Validators.required] });
  }

  get numberOfSeats() { return this.form.get('numberOfSeats')?.value; }

  book() {
    if(this.form.invalid) { return; }
    if(this.authService.currentUser?.email === undefined) { 
      this.router.navigate(['/register-passenger']); 
      return; 
    }

    const booking: BookDto = {
      flightId: this.flightId,
      passengerEmail: this.authService.currentUser?.email,
      numberOfSeats: this.numberOfSeats
    }
    this.flightService.bookFlight({ body: booking })
      .subscribe(_ => this.router.navigate(['/my-bookings']));
  }

  private initBookFlight() {
    this.activeRoute.paramMap.subscribe(params => this.flightId = +(params.get('flightId') ?? 0));
    this.flightService.findFlight({id: this.flightId}).subscribe(flight => {
      if (flight === null) { this.router.navigate(['/search-flights']); }
      else { this.flight = flight, this.handleError} 
    });
  }

  private handleError = (error: any) => {
    if(error.status === 404) {
      alert('Flight not found');
      this.router.navigate(['/search-flights']);
    }

    if(error.status === 409){
      console.log('Booking failed');
      alert(JSON.parse(error.error).message)
    }

    console.log("Response Error. Status: ", error.status);
    console.log("Response Error. Status Text: ", error.statusText);
    console.log(error);
  }
}
