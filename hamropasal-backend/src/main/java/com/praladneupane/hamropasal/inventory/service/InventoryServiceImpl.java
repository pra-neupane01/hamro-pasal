package com.praladneupane.hamropasal.inventory.service;

import com.praladneupane.hamropasal.common.dto.response.LowStockNotification;
import com.praladneupane.hamropasal.common.events.ProductCreatedEvent;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.inventory.dto.request.RestockProductRequest;
import com.praladneupane.hamropasal.inventory.dto.request.SellProductRequest;
import com.praladneupane.hamropasal.inventory.dto.response.InventoryUpdateResponse;
import com.praladneupane.hamropasal.inventory.entity.Inventory;
import com.praladneupane.hamropasal.inventory.mapper.InventoryMapper;
import com.praladneupane.hamropasal.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {
    private final InventoryRepository inventoryRepository;
    private final InventoryMapper inventoryMapper;


    @Override
    @Transactional
    public void createInventory(ProductCreatedEvent event) {
        checkIfInventoryExists(event);
        Inventory inventory = inventoryMapper.toEntity(event);
        inventoryRepository.save(inventory);
    }

    @Override
    @Transactional
    public InventoryUpdateResponse restockProduct(RestockProductRequest request) {
        validateQuantity(request.quantity());
        Inventory inventory = findInventory(request.productId());
        inventory.setQuantityInStock(inventory.getQuantityInStock() + request.quantity());
        return getResponse(inventory);
    }

    @Override
    @Transactional
    public InventoryUpdateResponse reduceStock(SellProductRequest request) {
        validateQuantity(request.quantity());
        Inventory inventory = findInventory(request.productId());
        inventory.setQuantityInStock(inventory.getQuantityInStock() - request.quantity());
        return getResponse(inventory);

    }

    @Override
    public List<LowStockNotification> getLowStockProducts() {
        return inventoryRepository.findAll().stream()
                .filter(inventory -> inventory.getQuantityInStock() <= inventory.getLowStockThreshold())
                .map(inventory -> LowStockNotification.builder()
                        .productId(inventory.getProduct().getId())
                        .productName(inventory.getProduct().getName())
                        .sku(inventory.getProduct().getSku())
                        .currentValue(inventory.getQuantityInStock())
                        .threshold(inventory.getLowStockThreshold())
                        .build())
                .toList();
    }

    //Private helpers methods
    private void checkIfInventoryExists(ProductCreatedEvent event) {
        if (inventoryRepository.existsByProductId(event.productId())) {
            throw new BusinessException("Inventory already exists");
        }
    }

    private Inventory findInventory(Long productId) {
        return inventoryRepository.findByProductId(productId).orElseThrow(() ->
                new ResourceNotFoundException("Inventory not found for particular product"));
    }

    private InventoryUpdateResponse getResponse(Inventory inventory) {
        return InventoryUpdateResponse.builder().productId(inventory.getProduct().getId())
                .productName(inventory.getProduct().getName())
                .newQuantity(inventory.getQuantityInStock())
                .build();
    }

    private void validateQuantity(Integer quantity) {
        if (quantity <= 0) {
            throw new BusinessException("Quantity should be grater than zero");
        }
    }

}
