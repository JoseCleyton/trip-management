import { TestBed } from '@angular/core/testing';

import { TithingService } from './tithing.service';

describe('TithingService', () => {
  let service: TithingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TithingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
