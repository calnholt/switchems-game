import { TestBed } from '@angular/core/testing';

import { SeedableRngService } from './seedable-rng.service';

describe('SeedService', () => {
  let service: SeedableRngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeedableRngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
