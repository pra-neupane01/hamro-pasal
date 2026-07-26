package com.praladneupane.hamropasal.inventory.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateInventoryThresholdRequest(
        @NotNull(message = "product ID is required")
        Long productId,

        @NotNull(message = "threshold is required")
        @Min(value = 0, message = "threshold must not be negative")
        Integer threshold
) {}
