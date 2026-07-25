package com.praladneupane.hamropasal.product.repository;

import com.praladneupane.hamropasal.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findByName(String name);

    boolean existsByName(String name);

    boolean existsBySku(String sku);

    boolean existsByBarcode(String barcode);

    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.id=:id")
    int deleteProduct(@Param(value = "id") Long id);


}
