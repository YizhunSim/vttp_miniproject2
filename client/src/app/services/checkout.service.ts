import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeliveryMethod } from '../common/delivery-method';
import { PaymentInfo } from '../common/payment-info';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl = environment.cartifyApiUrl + "/checkout/purchase";

  private paymentIntentUrl = environment.cartifyApiUrl + "/checkout/payment-intent";

  private deliveryMethodsUrl = environment.cartifyApiUrl + "/delivery-methods";

  purchase: Subject<Purchase> = new BehaviorSubject<Purchase>(new Purchase());

  paymentIntentResponse: Subject<any> = new BehaviorSubject<any>(null);


  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase) : Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any>{
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }

  getDeliveryMethods() : Observable<DeliveryMethod[]>{
    return this.httpClient
    .get<GetResponseDeliveryMethods>(this.deliveryMethodsUrl)
    .pipe(map(response => response._embedded.deliveryMethods));

  }

}

interface GetResponseDeliveryMethods {
  _embedded: {
    deliveryMethods: DeliveryMethod[];
  }
}
