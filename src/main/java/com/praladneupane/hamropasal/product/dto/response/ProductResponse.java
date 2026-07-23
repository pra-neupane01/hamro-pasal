package com.praladneupane.hamropasal.product.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ProductResponse(
        Long productId,
        String productName,
        String description,
        String sku,
        String barcode,
        BigDecimal price,
        String categoryName
) {
}
