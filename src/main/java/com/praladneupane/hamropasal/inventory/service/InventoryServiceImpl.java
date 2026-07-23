package com.praladneupane.hamropasal.inventory.service;

import com.praladneupane.hamropasal.common.events.ProductCreatedEvent;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.inventory.entity.Inventory;
import com.praladneupane.hamropasal.inventory.mapper.InventoryMapper;
import com.praladneupane.hamropasal.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {
    private final InventoryRepository inventoryRepository;
    private final InventoryMapper inventoryMapper;

    @Override
    public void createInventory(ProductCreatedEvent event) {
        checkIfInventoryExists(event);
        Inventory inventory = inventoryMapper.toEntity(event);
        inventoryRepository.save(inventory);

    }

    private void checkIfInventoryExists(ProductCreatedEvent event) {
        if (inventoryRepository.existsByProductId(event.productId())) {
            throw new BusinessException("Inventory already exists");
        }
    }
}
