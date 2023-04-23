import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Address } from 'src/app/common/address';
import { CartItem } from 'src/app/common/cart-item';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Purchase } from 'src/app/common/purchase';
import { PaymentInfo } from 'src/app/common/payment-info';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
// import { Stripe } from 'stripe';
// import Stripe from 'stripe';



@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit{
  @Input() checkoutForm!: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;

  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardErrors?: any

  paymentInfo: PaymentInfo = new PaymentInfo();

  totalPrice: number = 0;
  totalQuantity: number = 0;

  purchase!: Purchase;
  paymentIntent !: any;
    // Initialize Stripe API
  // StripeKey = environment.stripePublishableKey;

  cardElement: any;
  displayError: any = '';

  isDisabled: boolean = false;


  constructor(private checkoutService: CheckoutService, private cartService: CartService, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.checkoutService.purchase.subscribe(
      data => {
        this.purchase = data
      }
    )

    this.checkoutService.paymentIntentResponse.subscribe(
      data => {
        this.paymentIntent = data
      }
    )

    loadStripe(environment.stripePublishableKey).then(stripe => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change', event => {
          if (event.error) this.cardErrors = event.error.message
          else this.cardErrors = null
        })

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change', event => {
          if (event.error) this.cardErrors = event.error.message
          else this.cardErrors = null
        })

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change', event => {
          if (event.error) this.cardErrors = event.error.message
          else this.cardErrors = null
        })
      }
    })
    this.reviewCartDetails();

  }

    reviewCartDetails() {
    // subscribe to the cartService.TotalQuantity
    this.cartService.totalQuantity.subscribe(
      (totalQuantity) => (this.totalQuantity = totalQuantity)
    );

    // subscribe to the cartService.TotalPrice
    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  submitOrder(){
    // - confirm card payment
    // - place order

    this.checkoutService.placeOrder(this.purchase).subscribe({
      next: order => {
        this.stripe?.confirmCardPayment(this.paymentIntent.client_secret, {
          payment_method: {
            card: this.cardNumber!,
            billing_details: {
              email: this.purchase.customer.email,
              name: `${this.purchase.customer.firstName} ${this.purchase.customer.lastName}`,
              address: {
                line1: this.purchase.billingAddress.street,
                city: this.purchase.billingAddress.city,
                state: this.purchase.billingAddress.state,
                postal_code: this.purchase.billingAddress.zipCode,
                country: this.purchase.shippingAddress.country,
              },
            },
          },
        }).then((result: any) => {
          if (result.error) {
            // inform the customer there was an error
            alert(`There was an error: ${result.error.message}`);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              this.toastr.success('Your order has been submitted successfully');
              this.resetCart();
              this.router.navigateByUrl('checkout/success', order.orderTrackingNumber);
            } else{
              this.toastr.error(result.error.message)
            }
          }
        })
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    })

  }

  //   setupStripePaymentForm() {
  //   // get a handle to stripe elements
  //   const elements = this.stripe.elements();

  //   // create a card element ... and hide the zip-code field
  //   this.cardElement = elements.create('card', { hidePostalCode: true });

  //   // add an instance of card UI component into the 'card-element' div
  //   this.cardElement.mount('#card-element');

  //   // add event binding for the 'change' event on the card element
  //   this.cardElement.on('change', (event: any) => {
  //     // get a handle to card-errors element
  //     this.displayError = document.getElementById('card-errors');

  //     if (event.complete) {
  //       this.displayError.textContent = '';
  //     } else if (event.error) {
  //       // show validation error to customer
  //       this.displayError.textContent = event.error.message;
  //     }
  //   });
  // }

    resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    // navigate back to the products page
    this.router.navigateByUrl('/products');
  }

  private getOrderToCreate(cartItems: CartItem[]){
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;
    if (!deliveryMethodId || !shipToAddress) return;

   return {
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress,
   }
  }
}
