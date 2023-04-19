import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details-total',
  templateUrl: './cart-details-total.component.html',
  styleUrls: ['./cart-details-total.component.css']
})
export class CartDetailsTotalComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  shipping: number = 0;

    constructor(private cartService: CartService) { }

    ngOnInit() {
      this.listCartDetails();
    }
    listCartDetails() {
      // get a handle to the cart items
      this.cartItems = this.cartService.cartItems;

      // subscribe to the cart totalPrice
      this.cartService.totalPrice.subscribe(
        data => this.totalPrice = data
      )

      // subscribe to the cart totalQuantity
      this.cartService.totalQuantity.subscribe(
        data => this.totalQuantity = data
      )

      // compute cart total price and quantity
        this.cartService.computeCartTotals();
    }
}
