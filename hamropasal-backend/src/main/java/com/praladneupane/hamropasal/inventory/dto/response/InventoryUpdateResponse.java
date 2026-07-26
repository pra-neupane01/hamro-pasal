package com.praladneupane.hamropasal.inventory.dto.response;

import lombok.Builder;

@Builder
public record InventoryUpdateResponse(
        Long productId,
        String productName,
        Integer newQuantity
) {
}
