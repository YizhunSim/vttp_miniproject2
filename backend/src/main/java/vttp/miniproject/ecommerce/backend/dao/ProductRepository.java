package vttp.miniproject.ecommerce.backend.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import vttp.miniproject.ecommerce.backend.entity.Product;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
    /*
        SELECT * FROM PRODUCT WHERE category_id = ?;
        http://localhost:8080/api/products/search/findByCategoryId?id={{id}}
     */
    Page<Product> findByCategoryId(@Param("id")Long id, Pageable pageable);

    /*
        SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name, '%');
        http://localhost:8080/api/products/search/findByNameContaining?name={{name}}
     */
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

    /*
         SELECT * FROM PRODUCT WHERE category_id = ? ORDER BY unit_price asc;
         http://localhost:8080/api/products/search/findByCategoryIdOrderByUnitPriceAsc?id={{id}}
     */
    Page<Product> findByCategoryIdOrderByUnitPriceAsc(@Param("id")Long id, Pageable pageable);

    /*
       SELECT * FROM PRODUCT WHERE category_id = ? ORDER BY unit_price desc;
       http://localhost:8080/api/products/search/findByCategoryIdOrderByUnitPriceDesc?id={{id}}
   */
    Page<Product> findByCategoryIdOrderByUnitPriceDesc(@Param("id")Long id, Pageable pageable);

    /*
    SELECT * FROM PRODUCT WHERE category_id = ? ORDER BY unit_price desc;
    http://localhost:8080/api/products/search/findByCategoryIdOrderByName?id={{id}}
*/
    Page<Product> findByCategoryIdOrderByName(@Param("id")Long id, Pageable pageable);

}
