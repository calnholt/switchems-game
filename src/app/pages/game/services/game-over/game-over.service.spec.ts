import { TestBed } from '@angular/core/testing';

import { GameOverService } from './game-over.service';

describe('GameOverService', () => {
  let service: GameOverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameOverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
