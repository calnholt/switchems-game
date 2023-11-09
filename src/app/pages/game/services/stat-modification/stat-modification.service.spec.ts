import { TestBed } from '@angular/core/testing';

import { StatModificationService } from './stat-modification.service';

describe('StatModificationService', () => {
  let service: StatModificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatModificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
