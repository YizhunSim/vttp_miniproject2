import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
  @Output() addItem = new Subject<CartItem>();
  @Output() removeItem = new Subject<{id: string, quantity: number}>();
  @Input() isCart = true;

  constructor(public cartService: CartService) {

  }

  addCartItem(item: CartItem){
    this.addItem.next(item);
  }

  removeCartItem(id: string, quantity: number){
    this.removeItem.next({id, quantity});
  }


}
