import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../common/user-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  endpointOrders : string = environment.cartifyApiUrl + '/orders';
  endpointDeliveryMethods : string = environment.cartifyApiUrl + '/delivery-methods';

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return from(this.handleAccess(req, next));
  }

  private async handleAccess(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add an access token for secured endpoints
    const securedEndpoints = [this.endpointOrders, this.endpointDeliveryMethods];
    if (securedEndpoints.some(url => req.urlWithParams.includes(url))){
      // get access token
      const accessToken =this.oktaAuth.getAccessToken();

      // clone the request (immutable) and add new header with access token
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      })
    }
    return await lastValueFrom(next.handle(req));
  }
}
