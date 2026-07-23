package com.praladneupane.hamropasal.common.events;

import lombok.Builder;

@Builder
public record ProductCreatedEvent(
        Long productId,
        Integer quantity,
        String warehouseLocation

) {
}
