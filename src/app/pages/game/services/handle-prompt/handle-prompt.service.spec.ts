import { TestBed } from '@angular/core/testing';

import { HandlePromptService } from './handle-prompt.service';

describe('HandlePromptService', () => {
  let service: HandlePromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlePromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
