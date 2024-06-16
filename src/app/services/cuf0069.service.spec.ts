import { TestBed } from '@angular/core/testing';

import { Cuf0069Service } from './cuf0069.service';

describe('Cuf0069Service', () => {
  let service: Cuf0069Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cuf0069Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
