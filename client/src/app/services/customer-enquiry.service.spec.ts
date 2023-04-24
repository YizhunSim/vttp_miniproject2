import { TestBed } from '@angular/core/testing';

import { CustomerEnquiryService } from './customer-enquiry.service';

describe('CustomerEnquiryService', () => {
  let service: CustomerEnquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerEnquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
