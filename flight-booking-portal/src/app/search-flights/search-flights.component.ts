import { Component } from '@angular/core';
import { FlightService } from '../api/services';
import { Flight } from '../api/models';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrl: './search-flights.component.scss'
})
export class SearchFlightsComponent {
  searchResults: Flight[] = [];

  constructor(private flightService: FlightService) {}

  search() {
    this.flightService.searchFlight().subscribe((flights: Flight[]) => { 
      this.searchResults = flights; 
    });
  }
}
