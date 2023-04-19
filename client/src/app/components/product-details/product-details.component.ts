import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
    product!: Product ;
    quantity = 1;
    quantityInBasket = 0;

    constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private bcServce: BreadcrumbService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.handleProductDetails();
        });
    }

    handleProductDetails() {
        // get the "id" param string. convert string to a number using the "+" symbol
        const productId: number = +this.route.snapshot.paramMap.get('id')!;

        this.productService.getProduct(productId).subscribe(
            data => {
                this.product = data;
                this.bcServce.set('@productDetails', this.product.name)

                const items = this.cartService.cartItems;
                const item = items.find(item => +item.id === productId);
                if (item){
                    this.quantity = item.quantity;
                    this.quantityInBasket = item.quantity;
                }
            }
        )
    }


    incrementQuantity() {
      this.quantity++;
    }

    decrementQuantity() {
      if (this.quantity > 0){
        this.quantity--;
      }
    }

    updateBasket() {
      if (this.product) {
        if (this.quantity > this.quantityInBasket) {
          const itemsToAdd = this.quantity - this.quantityInBasket;
          this.quantityInBasket += itemsToAdd;
          this.cartService.addItemToCart(this.product, itemsToAdd);
        } else {
          const itemsToRemove = this.quantityInBasket - this.quantity;
          this.quantityInBasket -= itemsToRemove;
          this.cartService.removeItemFromCart(this.product.id, itemsToRemove);
        }
      }
    }

    get buttonText(){
      return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
    }


}
