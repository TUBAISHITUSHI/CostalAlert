import { TestBed } from '@angular/core/testing';

import { GenerelService } from './generel.service';

describe('GenerelService', () => {
  let service: GenerelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
