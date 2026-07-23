package com.praladneupane.hamropasal.inventory.dto.response;

import lombok.Builder;

@Builder
public record RestockProductResponse(
        Long productId,
        String productName,
        Integer newQuantity
) {
}
