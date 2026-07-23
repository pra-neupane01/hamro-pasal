package com.praladneupane.hamropasal.product.dto.request;

public record FilterProductRequest(
        String productName,
        String categoryName,
        String minPrice,
        String maxPrice,
        String barcode,
        String sku
) {
}
