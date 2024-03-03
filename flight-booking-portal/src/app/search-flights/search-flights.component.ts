import { Component } from '@angular/core';
import { FlightService } from './../api/services/flight.service';
import { Observable, of } from 'rxjs';
import { FlightRm } from '../api/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html'
})
export class SearchFlightsComponent {

  form: FormGroup = new FormGroup({});
  searchResult$: Observable<FlightRm[]> = of([]);

  constructor(
    private flightService: FlightService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      from: [''],
      destination: [''],
      fromDate: [''],
      toDate: [''],
      numberOfPassengers: [1]
    });
    this.search();
  }

  search() {
    this.searchResult$ = this.flightService.searchFlight(this.form.value);
  }
}
