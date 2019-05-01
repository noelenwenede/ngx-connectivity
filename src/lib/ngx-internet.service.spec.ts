import { TestBed, inject } from '@angular/core/testing';

import { InternetConnectivity } from './ngx-internet.service';

describe('NgxConnectivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternetConnectivity]
    });
  });

  it('should be created', inject([InternetConnectivity], (service: InternetConnectivity) => {
    expect(service).toBeTruthy();
  }));
});
