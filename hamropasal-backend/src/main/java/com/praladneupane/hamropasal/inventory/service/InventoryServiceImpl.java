package com.praladneupane.hamropasal.inventory.service;

import com.praladneupane.hamropasal.common.dto.response.LowStockNotification;
import com.praladneupane.hamropasal.common.events.ProductCreatedEvent;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.inventory.dto.request.RestockProductRequest;
import com.praladneupane.hamropasal.inventory.dto.request.SellProductRequest;
import com.praladneupane.hamropasal.inventory.dto.request.UpdateInventoryThresholdRequest;
import com.praladneupane.hamropasal.inventory.dto.response.InventoryResponse;
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
        if (inventoryRepository.existsByProductId(event.productId())) {
            throw new BusinessException("Inventory already exists for this product");
        }
        Inventory inventory = inventoryMapper.toEntity(event);
        inventoryRepository.save(inventory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InventoryResponse> getAllInventory() {
        return inventoryRepository.findAll().stream()
                .filter(inv -> !inv.isDeleted())
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public InventoryResponse getInventoryByProductId(Long productId) {
        Inventory inventory = findInventory(productId);
        return toResponse(inventory);
    }

    @Override
    @Transactional
    public InventoryUpdateResponse restockProduct(RestockProductRequest request) {
        if (request.quantity() <= 0) throw new BusinessException("Quantity must be greater than zero");
        Inventory inventory = findInventory(request.productId());
        inventory.setQuantityInStock(inventory.getQuantityInStock() + request.quantity());
        return buildUpdateResponse(inventory);
    }

    @Override
    @Transactional
    public InventoryUpdateResponse reduceStock(SellProductRequest request) {
        if (request.quantity() <= 0) throw new BusinessException("Quantity must be greater than zero");
        Inventory inventory = findInventory(request.productId());
        if (inventory.getQuantityInStock() < request.quantity()) {
            throw new BusinessException("Insufficient stock for product: " + inventory.getProduct().getName());
        }
        inventory.setQuantityInStock(inventory.getQuantityInStock() - request.quantity());
        return buildUpdateResponse(inventory);
    }

    @Override
    @Transactional
    public InventoryUpdateResponse updateThreshold(UpdateInventoryThresholdRequest request) {
        Inventory inventory = findInventory(request.productId());
        inventory.setLowStockThreshold(request.threshold());
        return buildUpdateResponse(inventory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LowStockNotification> getLowStockProducts() {
        return inventoryRepository.findAll().stream()
                .filter(inv -> inv.getQuantityInStock() <= inv.getLowStockThreshold())
                .map(inv -> LowStockNotification.builder()
                        .productId(inv.getProduct().getId())
                        .productName(inv.getProduct().getName())
                        .sku(inv.getProduct().getSku())
                        .currentValue(inv.getQuantityInStock())
                        .threshold(inv.getLowStockThreshold())
                        .build())
                .toList();
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private Inventory findInventory(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product ID: " + productId));
    }

    private InventoryResponse toResponse(Inventory inv) {
        return InventoryResponse.builder()
                .inventoryId(inv.getId())
                .productId(inv.getProduct().getId())
                .productName(inv.getProduct().getName())
                .sku(inv.getProduct().getSku())
                .categoryName(inv.getProduct().getCategory() != null
                        ? inv.getProduct().getCategory().getName() : null)
                .quantityInStock(inv.getQuantityInStock())
                .lowStockThreshold(inv.getLowStockThreshold())
                .warehouseLocation(inv.getWarehouseLocation())
                .lowStock(inv.getQuantityInStock() <= inv.getLowStockThreshold())
                .build();
    }

    private InventoryUpdateResponse buildUpdateResponse(Inventory inventory) {
        return InventoryUpdateResponse.builder()
                .productId(inventory.getProduct().getId())
                .productName(inventory.getProduct().getName())
                .newQuantity(inventory.getQuantityInStock())
                .build();
    }
}
