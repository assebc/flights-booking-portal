/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingRm } from '../../models/booking-rm';

export interface ListBooking$Params {
  email: string;
}

export function listBooking(http: HttpClient, rootUrl: string, params: ListBooking$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingRm>>> {
  const rb = new RequestBuilder(rootUrl, listBooking.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookingRm>>;
    })
  );
}

listBooking.PATH = '/Booking/{email}';
