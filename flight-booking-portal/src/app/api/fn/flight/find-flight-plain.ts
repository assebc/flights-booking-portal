/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Flight } from '../../models/flight';

export interface FindFlight$Plain$Params {
  id: string;
}

export function findFlight$Plain(http: HttpClient, rootUrl: string, params: FindFlight$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Flight>> {
  const rb = new RequestBuilder(rootUrl, findFlight$Plain.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Flight>;
    })
  );
}

findFlight$Plain.PATH = '/Flight/{id}';
