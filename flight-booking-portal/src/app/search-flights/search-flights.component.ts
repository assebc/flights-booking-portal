import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface FlightRm {
  airline: string;
  departure: TimePlaceRm;
  arrival: TimePlaceRm;
  price: string;
  remainingNumberOfSeats: number;
}

export interface TimePlaceRm {
  place: string;
  time: string;
}

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-flights.component.html',
  styleUrl: './search-flights.component.scss'
})
export class SearchFlightsComponent {

  searchResult: FlightRm[] = [
    {
      airline: "American Airlines",
      remainingNumberOfSeats: 500,
      departure: { time: Date.now().toString(), place: "Los Angeles"},
      arrival: { time: Date.now().toString(), place: "Istanbul" },
      price: "350"
    },
    {
      airline: "Deutsche BA",
      remainingNumberOfSeats: 60,
      departure: { time: Date.now().toString(), place: "Munchen"},
      arrival: { time: Date.now().toString(), place: "Schinpol" },
      price: "600"
    },
    {
      airline: "British Airways",
      remainingNumberOfSeats: 60,
      departure: { time: Date.now().toString(), place: "London, Englang"},
      arrival: { time: Date.now().toString(), place: "Vizzola-Ticino" },
      price: "600"
    }
  ]
}
