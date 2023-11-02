import { TestBed } from '@angular/core/testing';

import { PlayerCardManagerService } from './player-card-manager.service';

describe('PlayerCardManagerService', () => {
  let service: PlayerCardManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerCardManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
