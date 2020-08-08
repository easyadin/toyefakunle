import { TestBed } from '@angular/core/testing';

import { DevotionalService } from './devotional.service';

describe('DevotionalService', () => {
  let service: DevotionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevotionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
