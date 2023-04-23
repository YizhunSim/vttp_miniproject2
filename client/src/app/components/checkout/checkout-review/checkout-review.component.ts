import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/common/address';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit{
  @Input() appStepper?: CdkStepper

  @Input() checkoutForm!: FormGroup;
  paymentInfo: PaymentInfo = new PaymentInfo();
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private checkoutService: CheckoutService, private cartService: CartService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.reviewCartDetails()
  }

  createPaymentIntent(){
    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(
      (tempCartItem) => new OrderItem(tempCartItem)
    );

    // set up purchase
    let purchase = new Purchase();
    let customer = new Customer();
    let shippingAddress = new Address();

    // populate purchase - order
    customer.firstName = this.checkoutForm.get('addressForm')?.get('firstName')?.value
    customer.lastName = this.checkoutForm?.get('addressForm')?.get('lastName')?.value
    customer.email = this.checkoutForm?.get('addressForm')?.get('email')?.value

    purchase.customer = customer;

    shippingAddress.city = this.checkoutForm?.get('addressForm')?.get('city')?.value
    shippingAddress.country = this.checkoutForm?.get('addressForm')?.get('country')?.value
    shippingAddress.state = this.checkoutForm?.get('addressForm')?.get('state')?.value
    shippingAddress.street = this.checkoutForm?.get('addressForm')?.get('street')?.value
    shippingAddress.zipCode = this.checkoutForm?.get('addressForm')?.get('zipCode')?.value

    purchase.shippingAddress = shippingAddress;
    purchase.billingAddress = shippingAddress;

    // populate purchase - order and orderItems
    purchase.order = order
    purchase.orderItems = orderItems

    // compute payment info
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = 'USD';
    this.paymentInfo.receiptEmail = purchase.customer.email;

    console.log(`this.paymentInfo.amount: ${this.paymentInfo.amount}`);

    this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe({
      next: response => {
        this.toastr.success('Payment Intent Created');
        this.checkoutService.purchase.next(purchase);
        this.checkoutService.paymentIntentResponse.next(response);
        this.appStepper?.next()
      }
    })
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


  }


