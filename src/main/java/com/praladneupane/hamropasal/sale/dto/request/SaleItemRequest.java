package com.praladneupane.hamropasal.sale.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SaleItemRequest(
        @NotNull(message = "Product ID is required")
        Long productId,

        @NotNull(message = "quantity is required")
        @Positive(message = "Quantity must be greater than 0")
        Integer quantity) {
}
