import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/common/delivery-method';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css']
})
export class CheckoutDeliveryComponent implements OnInit{
  @Input() checkoutForm!: FormGroup;
  deliveryMethods: DeliveryMethod[] = [];

  constructor(private checkoutService: CheckoutService, private cartService: CartService){

  }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe(
      (dm: DeliveryMethod[]) => {
        this.deliveryMethods = dm;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  setShippingPrice(deliveryMethod: DeliveryMethod){
    this.cartService.setShippingPrice(deliveryMethod);
  }


}
