import { TestBed } from '@angular/core/testing';

import { GameUISelectionService } from './game-ui-selection.service';

describe('GameUISelectionService', () => {
  let service: GameUISelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUISelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
