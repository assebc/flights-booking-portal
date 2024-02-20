/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Flight } from '../models/flight';
import { searchFlight } from '../fn/flight/search-flight';
import { SearchFlight$Params } from '../fn/flight/search-flight';
import { searchFlight$Plain } from '../fn/flight/search-flight-plain';
import { SearchFlight$Plain$Params } from '../fn/flight/search-flight-plain';

@Injectable({ providedIn: 'root' })
export class FlightService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchFlight()` */
  static readonly SearchFlightPath = '/Flight';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFlight$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Plain$Response(params?: SearchFlight$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Flight>>> {
    return searchFlight$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFlight$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Plain(params?: SearchFlight$Plain$Params, context?: HttpContext): Observable<Array<Flight>> {
    return this.searchFlight$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Flight>>): Array<Flight> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFlight()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Response(params?: SearchFlight$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Flight>>> {
    return searchFlight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFlight$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight(params?: SearchFlight$Params, context?: HttpContext): Observable<Array<Flight>> {
    return this.searchFlight$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Flight>>): Array<Flight> => r.body)
    );
  }

}
