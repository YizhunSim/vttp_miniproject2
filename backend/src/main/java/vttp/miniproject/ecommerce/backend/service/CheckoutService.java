package vttp.miniproject.ecommerce.backend.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import vttp.miniproject.ecommerce.backend.dao.PaymentInfo;
import vttp.miniproject.ecommerce.backend.dto.Purchase;
import vttp.miniproject.ecommerce.backend.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
