package com.praladneupane.hamropasal.customer.dto.request;

import jakarta.validation.constraints.*;

public record CreateCustomerRequest(
        @NotBlank(message = "full name is required")
        @Size(min = 2, max = 100, message = "full name must be between 2 and 100 characters")
        String fullName,

        @Email(message = "email must be a valid email address")
        String email,

        @NotBlank(message = "phone is required")
        @Pattern(regexp = "^[+]?[0-9]{7,15}$", message = "phone must be a valid number")
        String phone,

        @Size(max = 255, message = "address must not exceed 255 characters")
        String address,

        @Size(max = 100, message = "city must not exceed 100 characters")
        String city
) {}
