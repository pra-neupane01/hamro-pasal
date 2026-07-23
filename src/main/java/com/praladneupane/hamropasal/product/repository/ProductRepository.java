package com.praladneupane.hamropasal.product.repository;

import com.praladneupane.hamropasal.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findByName(String name);

    boolean existsByName(String name);

    boolean existsBySku(String sku);

    boolean existsByBarcode(String barcode);


}
