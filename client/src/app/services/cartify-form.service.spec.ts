import { TestBed } from '@angular/core/testing';

import { CartifyFormService } from './cartify-form.service';

describe('CartifyFormService', () => {
  let service: CartifyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartifyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
