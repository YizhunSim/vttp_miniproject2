package vttp.miniproject.ecommerce.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vttp.miniproject.ecommerce.backend.entity.DeliveryMethods;

@RepositoryRestResource (collectionResourceRel = "deliveryMethods", path = "delivery-methods")
public interface DeliveryMethodRepository extends JpaRepository<DeliveryMethods, Long> {
    /*    https://localhost:8443/api/delivery-methods
    *     Retrieve all delivery methods
    * */
}
