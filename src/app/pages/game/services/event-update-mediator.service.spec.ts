import { TestBed } from '@angular/core/testing';

import { EventUpdateMediatorService } from './event-update-mediator.service';

describe('EventUpdateMediatorService', () => {
  let service: EventUpdateMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventUpdateMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
