package vttp.miniproject.ecommerce.backend.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vttp.miniproject.ecommerce.backend.dao.PaymentInfo;
import vttp.miniproject.ecommerce.backend.dto.Purchase;
import vttp.miniproject.ecommerce.backend.dto.PurchaseResponse;
import vttp.miniproject.ecommerce.backend.service.CheckoutService;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/checkout")
/*
    CheckoutController -> CheckoutService -> Spring Data JPA Repository -> MySQL DB
 */
public class CheckoutController {

    private Logger logger = Logger.getLogger(getClass().getName());
    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    /*
    * By default, CSRF is enabled. CSRF performs checks on POST using Cookies. Since we are not using Cookies for session tracking,
    * CSRF request is unauthorized. We can resolve this by disabling CSRF. Technique commonly used for REST APIs
    * */
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException {
        logger.info("paymentInfo.amount: " + paymentInfo.getAmount());
        PaymentIntent paymentIntent = checkoutService.createPaymentIntent(paymentInfo);

        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }
}
