import { TestBed } from '@angular/core/testing';

import { GamePhaseService } from './game-phase.service';

describe('ResolveActionsService', () => {
  let service: GamePhaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
