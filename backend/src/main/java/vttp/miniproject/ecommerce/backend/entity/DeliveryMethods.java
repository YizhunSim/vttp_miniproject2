package vttp.miniproject.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "delivery_methods")
@Getter
@Setter
public class DeliveryMethods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "short_name")
    private String shortName;
    @Column(name = "description")
    private String description;
    @Column(name = "delivery_time")
    private String deliveryTime;
    @Column(name = "price")
    private BigDecimal price;
}
