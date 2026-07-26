package com.praladneupane.hamropasal.inventory.repository;

import com.praladneupane.hamropasal.inventory.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByProductId(Long id);

    boolean existsByProductId(Long productId);

    Long countByQuantityInStockLessThanEqual(Integer threshold);

    @Query("SELECT SUM(i.quantityInStock * p.price) FROM Inventory i JOIN Product p ON i.product.id = p.id")
    Double getTotalInventoryValue();
}
