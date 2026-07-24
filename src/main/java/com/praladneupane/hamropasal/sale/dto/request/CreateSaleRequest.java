package com.praladneupane.hamropasal.sale.dto.request;


import com.praladneupane.hamropasal.sale.entity.PaymentMethod;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateSaleRequest(
        @NotEmpty(message = "Sale must contain at least one item")
        List<SaleItemRequest> items,

        @NotNull(message = "Payment method is required")
        PaymentMethod paymentMethod,

        Double taxAmount
) {
}
