import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../api/models/flight';
import { FlightService } from '../api/services/flight.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
})
export class BookFlightComponent {
  flightId: string = '';
  flight$: Observable<Flight> = of({});

  constructor(private activeRoute: ActivatedRoute, private flightService: FlightService){
    this.activeRoute.paramMap.subscribe(params => this.flightId = params.get('flightId') ?? '');
    this.flight$ = this.flightService.findFlight({id: this.flightId});
  }
}
