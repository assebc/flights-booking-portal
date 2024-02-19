/* tslint:disable */
/* eslint-disable */
import { TimePlace } from '../models/time-place';
export interface Flight {
  airline?: string | null;
  arrival?: TimePlace;
  departure?: TimePlace;
  id?: string;
  price?: string | null;
  remainingNumberOfSeats?: number;
}
