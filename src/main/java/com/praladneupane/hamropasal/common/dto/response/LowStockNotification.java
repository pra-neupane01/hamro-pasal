package com.praladneupane.hamropasal.common.dto.response;

import lombok.Builder;

@Builder
public record LowStockNotification(
        Long productId,
        String productName,
        Integer currentValue
) {
}
