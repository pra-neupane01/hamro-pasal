package com.praladneupane.hamropasal.sale.dto.response;

import com.praladneupane.hamropasal.sale.entity.PaymentMethod;

import java.time.LocalDateTime;
import java.util.List;

public record SaleResponse(
        Long id,
        String cashierName,
        String cashierEmail,
        Double totalAmount,
        Double taxAmount,
        Double netAmount,
        PaymentMethod paymentMethod,
        List<SaleItemResponse> items,
        LocalDateTime createdAt

) {
}
