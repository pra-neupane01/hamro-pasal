package com.praladneupane.hamropasal.customer.dto.request;

import jakarta.validation.constraints.*;

public record UpdateCustomerRequest(
        @NotNull(message = "customer ID is required")
        Long id,

        @Size(min = 2, max = 100)
        String fullName,

        @Email
        String email,

        @Pattern(regexp = "^[+]?[0-9]{7,15}$")
        String phone,

        String address,
        String city
) {}
