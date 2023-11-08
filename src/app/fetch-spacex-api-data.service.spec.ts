import { TestBed } from '@angular/core/testing';

import { FetchSpacexApiDataService } from './fetch-spacex-api-data.service';

describe('FetchSpacexApiDataService', () => {
  let service: FetchSpacexApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchSpacexApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
