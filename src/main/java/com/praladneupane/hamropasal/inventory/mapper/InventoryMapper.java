package com.praladneupane.hamropasal.inventory.mapper;

import com.praladneupane.hamropasal.common.events.ProductCreatedEvent;
import com.praladneupane.hamropasal.inventory.entity.Inventory;
import com.praladneupane.hamropasal.product.entity.Product;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class InventoryMapper {
    private final EntityManager entityManager;

    public Inventory toEntity(ProductCreatedEvent event) {
        return Inventory
                .builder()
                .product(entityManager.find(Product.class, event.productId()))
                .quantityInStock(event.quantity())
                .warehouseLocation(event.warehouseLocation())
                .build();
    }
}
