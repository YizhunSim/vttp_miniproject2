import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';


import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartDetailsTotalComponent } from './components/cart-details-total/cart-details-total.component';
import { StepperComponent } from './components/stepper/stepper.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from './components/checkout/checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './components/checkout/checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './components/checkout/checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './components/checkout/checkout-payment/checkout-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    ShopComponent,
    ProductItemComponent,
    PagingHeaderComponent,
    PagerComponent,
    HomeComponent,
    CartDetailsTotalComponent,
    StepperComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent

  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    CdkStepperModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
