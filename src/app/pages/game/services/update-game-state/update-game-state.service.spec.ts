import { TestBed } from '@angular/core/testing';

import { UpdateGameStateService } from './update-game-state.service';

describe('UpdateGameStateService', () => {
  let service: UpdateGameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateGameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
