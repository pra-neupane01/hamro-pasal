package com.praladneupane.hamropasal.product.dto.request;

import jakarta.validation.constraints.Size;

public record FilterProductRequest(
        @Size(max = 150, message = "product name search query must not exceed 150 characters")
        String productName,

        @Size(max = 100, message = "category name search query must not exceed 100 characters")
        String categoryName,

        String minPrice,

        String maxPrice,

        @Size(max = 50, message = "barcode search query must not exceed 50 characters")
        String barcode,

        @Size(max = 50, message = "SKU search query must not exceed 50 characters")
        String sku
) {
}
