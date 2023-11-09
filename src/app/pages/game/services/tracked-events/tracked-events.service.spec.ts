import { TestBed } from '@angular/core/testing';

import { PlayerTrackedEventsService } from './player-tracked-events.service';

describe('TrackedEventsService', () => {
  let service: PlayerTrackedEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerTrackedEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
