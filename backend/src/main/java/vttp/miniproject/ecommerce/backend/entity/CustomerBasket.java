package vttp.miniproject.ecommerce.backend.entity;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
public class CustomerBasket {
    @NonNull
    public String id ;

    public List<BasketItem> items = new ArrayList<BasketItem>();

}
