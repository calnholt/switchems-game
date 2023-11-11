import { TestBed } from '@angular/core/testing';

import { CurrentGamePhaseService } from './current-game-phase.service';

describe('CurrentGamePhaseService', () => {
  let service: CurrentGamePhaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentGamePhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
