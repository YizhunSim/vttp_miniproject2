package vttp.miniproject.ecommerce.backend.dto;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.Data;

@Data
public class CustomerEnquiry {
    private String name;
    private String email;
    private String message;

    public static CustomerEnquiry Create(JsonObject enquiry){
        CustomerEnquiry ce = new CustomerEnquiry();
        ce.name = enquiry.getString("name");
        ce.email = enquiry.getString("email");
        ce.message = enquiry.getString("message");
        return ce;
    }
}
