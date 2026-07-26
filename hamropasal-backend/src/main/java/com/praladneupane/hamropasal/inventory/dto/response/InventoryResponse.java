package com.praladneupane.hamropasal.inventory.dto.response;

import lombok.Builder;

@Builder
public record InventoryResponse(
        Long inventoryId,
        Long productId,
        String productName,
        String sku,
        String categoryName,
        Integer quantityInStock,
        Integer lowStockThreshold,
        String warehouseLocation,
        boolean lowStock
) {}
