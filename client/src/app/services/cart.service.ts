import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { DeliveryMethod } from '../common/delivery-method';
import { Product } from '../common/product';
import { CheckoutService } from './checkout.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[]= [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  // storage: Storage = localStorage
  storage: Storage = sessionStorage

  shipping = 0

  constructor(private checkoutService: CheckoutService) {
    // Read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null){
      this.cartItems = data;
      // compute totals based on the data that is read from storage
      this.computeCartTotals();
    }
  }

  getCurrentBasketValue() {
    return this.cartItems;
  }


  setShippingPrice(deliveryMethod: DeliveryMethod){
    this.shipping = deliveryMethod.price
    this.computeCartTotals()
  }


  addToCart(cartItem: CartItem){
    // Check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0){
      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id)!;
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart){
      // add item to the array
      existingCartItem.quantity++;
    } else{
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }



  /* Used in product-detail component  */
  addItemToCart(product : Product, quantity: number) {
    const item = this.mapProductItemToBasketItem(product, quantity);
    console.log(`addItemToCart: ${item.id}, ${item.name}, ${item.unitPrice}, quantity: ${quantity}`)
    this.addToCart(item);
  }

  removeItemFromCart(id: string, quantity : number = 1){
    const cart = this.cartItems;
    if (!cart) return;
    const existingItem = cart.find(tempCartItem => tempCartItem.id === id);
    if (existingItem) {
      console.log(`removeItemFromCart: ${existingItem.id}, ${existingItem.name}, ${existingItem.unitPrice}, quantity: ${quantity}`)
      existingItem.quantity -= quantity;
      if (existingItem.quantity === 0) {
        this.remove(existingItem);
      }
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }


  private mapProductItemToBasketItem(item: Product, quantity: number): CartItem {
    return {
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      unitPrice: item.unitPrice,
      quantity: quantity
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0
    let totalQuantityValue: number = 0

    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    totalPriceValue += this.shipping

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

    // persist cart data
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if(cartItem.quantity === 0){
      this.remove(cartItem);
    } else{
      this.computeCartTotals();
    }
  }
  remove(cartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);

    // if found, remove the item from the array at the given index
    if (itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
