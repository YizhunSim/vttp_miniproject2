import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  @Input() product!: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Product){
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);

    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);

  }
}
