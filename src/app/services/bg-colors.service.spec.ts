import { TestBed } from '@angular/core/testing';

import { BgColorsService } from './bg-colors.service';

describe('BgColorsService', () => {
  let service: BgColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BgColorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
