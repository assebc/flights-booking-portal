/* tslint:disable */
/* eslint-disable */
import { TimePlaceRm } from '../models/time-place-rm';
export interface BookingRm {
  airline?: string | null;
  arrival?: TimePlaceRm;
  departure?: TimePlaceRm;
  flightId?: number;
  numberOfSeats?: number;
  passengerEmail?: string | null;
  price?: string | null;
}
