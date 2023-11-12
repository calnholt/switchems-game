import { TestBed } from '@angular/core/testing';

import { CurrentPhaseService } from './current-phase.service';

describe('CurrentPhaseService', () => {
  let service: CurrentPhaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentPhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
