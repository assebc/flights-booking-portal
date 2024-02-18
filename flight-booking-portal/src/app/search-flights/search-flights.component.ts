import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Flight } from './models/flight.model';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-flights.component.html',
  styleUrl: './search-flights.component.scss'
})
export class SearchFlightsComponent {

  searchResult: Flight[] = []
}
