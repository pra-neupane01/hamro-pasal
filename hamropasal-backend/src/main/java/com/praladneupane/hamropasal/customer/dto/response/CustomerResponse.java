package com.praladneupane.hamropasal.customer.dto.response;

import lombok.Builder;
import java.time.LocalDateTime;

@Builder
public record CustomerResponse(
        Long id,
        String fullName,
        String email,
        String phone,
        String address,
        String city,
        Double totalPurchases,
        Integer loyaltyPoints,
        boolean active,
        LocalDateTime createdAt
) {}
