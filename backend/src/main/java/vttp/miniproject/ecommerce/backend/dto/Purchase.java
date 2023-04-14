package vttp.miniproject.ecommerce.backend.dto;


import lombok.Data;
import vttp.miniproject.ecommerce.backend.entity.Address;
import vttp.miniproject.ecommerce.backend.entity.Customer;
import vttp.miniproject.ecommerce.backend.entity.Order;
import vttp.miniproject.ecommerce.backend.entity.OrderItem;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
