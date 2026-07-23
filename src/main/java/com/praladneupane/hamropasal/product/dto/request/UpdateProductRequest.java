package com.praladneupane.hamropasal.product.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record UpdateProductRequest(
        @NotNull Long productId,
        @Size(max = 150, message = "product name must not exceed 150 characters")
        String name,
        @Size(max = 500, message = "description must not exceed 500 characters")
        String description,

        @Size(max = 50, message = "SKU must not exceed 50 characters")
        String sku,

        @Size(max = 50, message = "barcode must not exceed 50 characters")
        String barcode,

        @DecimalMin(value = "0.0", inclusive = false, message = "price must be greater than 0")
        @Digits(integer = 8, fraction = 2, message = "price must have at most 8 integer digits and 2 decimal places")
        BigDecimal price
) {
}
