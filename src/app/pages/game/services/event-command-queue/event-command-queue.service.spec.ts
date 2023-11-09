import { TestBed } from '@angular/core/testing';

import { EventCommandQueueService } from './event-command-queue.service';

describe('EventQueueService', () => {
  let service: EventCommandQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventCommandQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
