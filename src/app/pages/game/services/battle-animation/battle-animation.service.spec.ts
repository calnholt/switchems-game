import { TestBed } from '@angular/core/testing';

import { BattleAnimationService } from './battle-animation.service';

describe('BattleAnimationService', () => {
  let service: BattleAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
