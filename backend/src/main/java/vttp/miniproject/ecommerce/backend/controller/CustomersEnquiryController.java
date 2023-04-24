package vttp.miniproject.ecommerce.backend.controller;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.miniproject.ecommerce.backend.dto.CustomerEnquiry;
import vttp.miniproject.ecommerce.backend.service.GoogleAPIService;

@RestController
@RequestMapping("/api/customer-enquiry")
public class CustomersEnquiryController {
    @Autowired
    private GoogleAPIService googleApiService;

    @PostMapping
    public ResponseEntity<String> postCustomerEnquiry(@RequestBody String payload) throws Exception {
        try {
            System.out.println(payload);

            JsonReader reader = Json.createReader(new StringReader(payload));
            JsonObject json = reader.readObject();

            CustomerEnquiry ce = CustomerEnquiry.Create(json);
            googleApiService.sendMail(ce);

            return ResponseEntity.ok(payload);
        } catch (Exception e) {
            // Handle the exception here, e.g. log it or return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending mail: " + e.getMessage());
        }
    }
}
