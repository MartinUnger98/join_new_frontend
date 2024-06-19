import { TestBed } from '@angular/core/testing';

import { BackendServicesService } from './backend-services.service';

describe('BackendServicesService', () => {
  let service: BackendServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
