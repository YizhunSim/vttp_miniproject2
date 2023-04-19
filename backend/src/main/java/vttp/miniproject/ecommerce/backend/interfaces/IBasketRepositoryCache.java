package vttp.miniproject.ecommerce.backend.interfaces;

import vttp.miniproject.ecommerce.backend.entity.CustomerBasket;

public interface IBasketRepositoryCache {
    CustomerBasket getBasket(String basketId);

    CustomerBasket updateBasket(CustomerBasket basket);

    Boolean deleteBasket(String basketId);
}
