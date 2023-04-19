package vttp.miniproject.ecommerce.backend.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BasketItem {
    public int id;
    public String productName;
    public double price;
    public int quantity;
    public String imageUrl;
    public String category;
}
