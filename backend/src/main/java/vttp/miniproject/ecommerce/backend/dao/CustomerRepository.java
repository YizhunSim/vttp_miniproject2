package vttp.miniproject.ecommerce.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vttp.miniproject.ecommerce.backend.entity.Customer;

/*
CustomerRepository is not annotated. Not be exposed as REST API based on our configurations
 */
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    /* SELECT * FROM Customer c WHERE c.email = email;
    * return null if not found
    */
    Customer findByEmail(String email);
}
