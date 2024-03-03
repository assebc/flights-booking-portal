/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { bookFlight } from '../fn/flight/book-flight';
import { BookFlight$Params } from '../fn/flight/book-flight';
import { findFlight } from '../fn/flight/find-flight';
import { FindFlight$Params } from '../fn/flight/find-flight';
import { findFlight$Plain } from '../fn/flight/find-flight-plain';
import { FindFlight$Plain$Params } from '../fn/flight/find-flight-plain';
import { FlightRm } from '../models/flight-rm';
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
  searchFlight$Plain$Response(params?: SearchFlight$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FlightRm>>> {
    return searchFlight$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFlight$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Plain(params?: SearchFlight$Plain$Params, context?: HttpContext): Observable<Array<FlightRm>> {
    return this.searchFlight$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FlightRm>>): Array<FlightRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFlight()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight$Response(params?: SearchFlight$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FlightRm>>> {
    return searchFlight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFlight$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFlight(params?: SearchFlight$Params, context?: HttpContext): Observable<Array<FlightRm>> {
    return this.searchFlight$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FlightRm>>): Array<FlightRm> => r.body)
    );
  }

  /** Path part for operation `bookFlight()` */
  static readonly BookFlightPath = '/Flight';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bookFlight()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlight$Response(params?: BookFlight$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return bookFlight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `bookFlight$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlight(params?: BookFlight$Params, context?: HttpContext): Observable<void> {
    return this.bookFlight$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findFlight()` */
  static readonly FindFlightPath = '/Flight/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFlight$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Plain$Response(params: FindFlight$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FlightRm>> {
    return findFlight$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFlight$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Plain(params: FindFlight$Plain$Params, context?: HttpContext): Observable<FlightRm> {
    return this.findFlight$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FlightRm>): FlightRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFlight()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight$Response(params: FindFlight$Params, context?: HttpContext): Observable<StrictHttpResponse<FlightRm>> {
    return findFlight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFlight$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFlight(params: FindFlight$Params, context?: HttpContext): Observable<FlightRm> {
    return this.findFlight$Response(params, context).pipe(
      map((r: StrictHttpResponse<FlightRm>): FlightRm => r.body)
    );
  }

}
