package com.praladneupane.hamropasal.product.dto.response;

import lombok.Builder;

import java.math.BigDecimal;
import java.util.UUID;

@Builder
public record CreateProductResponse(
        UUID productId,
        String productName,
        String description,
        String sku,
        String barcode,
        BigDecimal price,
        String categoryName
) {
}
