package com.praladneupane.hamropasal.sale.dto.response;

public record SaleItemResponse(
        Long id,
        Long productId,
        String productName,
        String barcode,
        Integer quantity,
        Double unitPrice,
        Double subtotal
) {
}
