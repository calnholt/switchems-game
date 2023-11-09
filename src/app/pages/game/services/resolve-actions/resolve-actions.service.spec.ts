import { TestBed } from '@angular/core/testing';

import { ResolveActionsService } from './resolve-actions.service';

describe('ResolveActionsService', () => {
  let service: ResolveActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolveActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
