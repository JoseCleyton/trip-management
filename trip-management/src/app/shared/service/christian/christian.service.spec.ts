import { TestBed } from '@angular/core/testing';

import { ChristianService } from './christian.service';

describe('ChristianService', () => {
  let service: ChristianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChristianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
