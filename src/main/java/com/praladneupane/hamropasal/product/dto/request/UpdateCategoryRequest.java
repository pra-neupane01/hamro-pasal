package com.praladneupane.hamropasal.product.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateCategoryRequest(
        @NotBlank(message = "category name is required")
        @Size(max = 100, message = "category name must not exceed 100 characters")
        String name,

        @Size(max = 500, message = "description must not exceed 500 characters")
        String description
) {
}
