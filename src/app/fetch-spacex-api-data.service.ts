import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FetchSpacexApiResponse } from './fetch-spacex-api-response.model';

@Injectable({
  providedIn: 'root',
})
export class FetchSpacexApiDataService {
  constructor(private http: HttpClient) {}

  fetchData(page: number = 1) {
    return this.http
      .post('https://api.spacexdata.com/v5/launches/query', {
        query: {},
        options: {
          limit: 20,
          page: page,
          select: {
            name: 1,
            date_utc: 1,
            flight_number: 1,
            crew: 1,
            details: 1,
            success: 1,
            rocket: 1,
            launchpad: 1,
            links: 1,
          },
          populate: [
            {
              path: 'rocket',
              select: {
                name: 1,
                flickr_images: 1,
              },
            },
            {
              path: 'launchpad',
              select: {
                name: 1,
                locality: 1,
              },
            },
          ],
          sort: {
            date_utc: 'desc',
          },
        },
      })
      .pipe(
        map((response: FetchSpacexApiResponse) => {
          console.log(response);

          return response;
        }),
      );
  }
}
