package com.praladneupane.hamropasal.sale.dto.request;


import com.praladneupane.hamropasal.sale.entity.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.List;

public record CreateSaleRequest(
        @NotEmpty(message = "Sale must contain at least one item")
        List<@NotNull(message = "Sale item is required") @Valid SaleItemRequest> items,

        @NotNull(message = "Payment method is required")
        PaymentMethod paymentMethod,

        @PositiveOrZero(message = "Tax amount cannot be negative")
        Double taxAmount
) {
}
