import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';
import { Router, RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { LoginComponent } from './components/login/login.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HomeComponent } from './components/home/home.component';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage },
  },
  {
    path: 'members',
    component: MembersPageComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage },
  },

  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },

  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}},
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id/:name/:sort', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', component: HomeComponent, data: {breadcrumb: 'Home'} },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    OktaAuthModule
  ],
  exports: [RouterModule],
  providers:[
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ]
})
export class AppRoutingModule { }
