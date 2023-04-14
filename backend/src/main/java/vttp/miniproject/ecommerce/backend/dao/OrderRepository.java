package vttp.miniproject.ecommerce.backend.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vttp.miniproject.ecommerce.backend.entity.Order;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {
    /*
        SELECT * FROM orders LEFT OUTER JOIN customer on orders.customer_id = customer.id WHERE customer.email=:email ORDER BY orders.date_created DESC
        http://localhost:8080/api/orders/search/findByCustomerEmail?email=john.wick@cartify.com
     */
    Page<Order> findByCustomerEmailOrderByDateCreatedDesc(@Param("email") String email, Pageable pageable);

}
