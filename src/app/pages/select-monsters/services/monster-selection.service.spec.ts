import { TestBed } from '@angular/core/testing';

import { MonsterSelectionService } from './monster-selection.service';

describe('MonsterSelectionService', () => {
  let service: MonsterSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
