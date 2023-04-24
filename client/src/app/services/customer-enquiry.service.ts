import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerEnquiry } from '../common/customer-enquiry';

@Injectable({
  providedIn: 'root'
})
export class CustomerEnquiryService {
  private customerEnquiryUrl = environment.cartifyApiUrl + "/customer-enquiry";

  constructor(private httpClient: HttpClient) { }

  sendCustomerEnquiry(customerEnquiry: CustomerEnquiry) : Observable<any>{
    return this.httpClient.post<CustomerEnquiry>(this.customerEnquiryUrl, customerEnquiry);
  }
}
