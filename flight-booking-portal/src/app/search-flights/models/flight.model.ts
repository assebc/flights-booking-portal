export interface TimePlace {
  place: string;
  time: string;
}

export interface FlightDTO {
  airline: string;
  departure: TimePlace;
  arrival: TimePlace;
  price: string;
  remainingNumberOfSeats: number;
}

export class Flight {
  readonly airline: string = '';
  readonly departure: TimePlace = { place: '', time: '' };
  readonly arrival: TimePlace = { place: '', time: '' };
  readonly price: string = '';
  readonly remainingNumberOfSeats: number = 0;

  constructor(dto?: FlightDTO) {
    this.airline = dto?.airline ?? this.airline;
    this.departure = dto?.departure ?? this.departure;
    this.arrival = dto?.arrival ?? this.arrival;
    this.price = dto?.price ?? this.price;
    this.remainingNumberOfSeats = dto?.remainingNumberOfSeats ?? this.remainingNumberOfSeats;
  }

  toDTO(): FlightDTO {
    return {
      airline: this.airline,
      departure: this.departure,
      arrival: this.arrival,
      price: this.price,
      remainingNumberOfSeats: this.remainingNumberOfSeats
    }
  }
}