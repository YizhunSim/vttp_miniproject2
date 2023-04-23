import { createId } from '@paralleldrive/cuid2';
import { CartItem } from './cart-item';

export interface BasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface Basket {
    id: string;
    items: CartItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    shippingPrice: number;
}

export class Basket implements Basket {
    id = createId();
    items: CartItem[] = [];
    shippingPrice = 0;
}

export interface BasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}
