package com.jorgepiconjr.shopspring.repository;

import com.jorgepiconjr.shopspring.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    /*
    @Query to search products by name, description, brand, or category
    (case insensitive) and not just byId.
    LOWER function is used to make the search case insensitive.
    CONCAT function is used to add wildcards (%) before and after the keyword
    LIKE operator is used to perform the search.
    */
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    public List<Product> searchProducts(String keyword);
}
