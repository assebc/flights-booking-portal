/* tslint:disable */
/* eslint-disable */
import { TimePlaceRm } from '../models/time-place-rm';
export interface FlightRm {
  airline?: string | null;
  arrival?: TimePlaceRm;
  departure?: TimePlaceRm;
  id?: number;
  price?: string | null;
  remainingNumberOfSeats?: number;
}
