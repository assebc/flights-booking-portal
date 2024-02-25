/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findPassenger } from '../fn/passenger/find-passenger';
import { FindPassenger$Params } from '../fn/passenger/find-passenger';
import { registerPassenger } from '../fn/passenger/register-passenger';
import { RegisterPassenger$Params } from '../fn/passenger/register-passenger';

@Injectable({ providedIn: 'root' })
export class PassengerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerPassenger()` */
  static readonly RegisterPassengerPath = '/Passenger';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerPassenger()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassenger$Response(params?: RegisterPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return registerPassenger(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerPassenger$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassenger(params?: RegisterPassenger$Params, context?: HttpContext): Observable<void> {
    return this.registerPassenger$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findPassenger()` */
  static readonly FindPassengerPath = '/Passenger/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPassenger()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassenger$Response(params: FindPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return findPassenger(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPassenger$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassenger(params: FindPassenger$Params, context?: HttpContext): Observable<void> {
    return this.findPassenger$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
