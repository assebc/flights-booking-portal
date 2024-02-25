import { Component } from '@angular/core';
import { FlightService } from './../api/services/flight.service';
import { Flight } from '../api/models';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html'
})
export class SearchFlightsComponent {

  searchResult$: Observable<Flight[]> = of([]);

  constructor(private flightService: FlightService) { }

  search() {
    this.searchResult$ = this.flightService.searchFlight();
  }
}
