import { Component } from '@angular/core';
import { FlightService } from './../api/services/flight.service';
import { Observable, of } from 'rxjs';
import { FlightRm } from '../api/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html'
})
export class SearchFlightsComponent {

  form: FormGroup = new FormGroup({});
  searchResult$: Observable<FlightRm[]> = of([]);

  constructor(
    private flightService: FlightService,
    private router: Router,
    private authService: AuthService,
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
    if(this.authService.currentUser?.email === undefined){
      this.router.navigate(['/register-passenger']);
      return;
    }

    this.searchResult$ = this.flightService.searchFlight(this.form.value);
  }
}
