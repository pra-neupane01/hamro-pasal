package com.praladneupane.hamropasal.sale.mapper;

import com.praladneupane.hamropasal.product.entity.Product;
import com.praladneupane.hamropasal.sale.dto.request.CreateSaleRequest;
import com.praladneupane.hamropasal.sale.dto.request.SaleItemRequest;
import com.praladneupane.hamropasal.sale.dto.response.SaleItemResponse;
import com.praladneupane.hamropasal.sale.dto.response.SaleResponse;
import com.praladneupane.hamropasal.sale.entity.Sale;
import com.praladneupane.hamropasal.sale.entity.SaleItem;
import com.praladneupane.hamropasal.user.model.User;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class SaleMapper {

    public SaleItem toItemEntity(SaleItemRequest request, Product product) {
        if (request == null || product == null) {
            return null;
        }

        BigDecimal unitPrice = product.getPrice();
        BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(request.quantity()));

        SaleItem item = new SaleItem();
        item.setProduct(product);
        item.setQuantity(request.quantity());
        item.setUnitPrice(unitPrice);
        item.setSubtotal(subtotal);

        return item;
    }

    public Sale toEntity(CreateSaleRequest request, User cashier, List<SaleItem> items) {
        if (request == null) {
            return null;
        }

        List<SaleItem> saleItems = items == null ? new ArrayList<>() : new ArrayList<>(items);
        BigDecimal grossTotal = saleItems.stream()
                .map(SaleItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal tax = toAmount(request.taxAmount());

        Sale sale = new Sale();
        sale.setCashierName(cashier != null ? cashier.getFullName() : null);
        sale.setCashierEmail(cashier != null ? cashier.getEmail() : null);
        sale.setPaymentMethod(request.paymentMethod());
        sale.setSaleDate(LocalDate.now().toString());
        sale.setTotalAmount(grossTotal);
        sale.setTaxAmount(tax);
        sale.setNetAmount(grossTotal.add(tax));

        saleItems.forEach(item -> item.setSale(sale));
        sale.setSaleItems(saleItems);

        return sale;
    }

    public SaleResponse toResponse(Sale sale) {
        if (sale == null) {
            return null;
        }

        List<SaleItemResponse> itemResponses = sale.getSaleItems() != null
                ? sale.getSaleItems().stream().map(this::toItemResponse).collect(Collectors.toList())
                : Collections.emptyList();

        return new SaleResponse(
                sale.getId(),
                valueOrDefault(sale.getCashierName(), "N/A"),
                valueOrDefault(sale.getCashierEmail(), "N/A"),
                toDouble(sale.getTotalAmount()),
                toDouble(sale.getTaxAmount()),
                toDouble(sale.getNetAmount()),
                sale.getPaymentMethod(),
                itemResponses,
                sale.getCreatedAt()
        );
    }

    public SaleItemResponse toItemResponse(SaleItem item) {
        if (item == null) {
            return null;
        }

        Product product = item.getProduct();

        return new SaleItemResponse(
                item.getId(),
                product != null ? product.getId() : null,
                product != null ? product.getName() : "Unknown Product",
                product != null ? product.getBarcode() : "N/A",
                item.getQuantity(),
                toDouble(item.getUnitPrice()),
                toDouble(item.getSubtotal())
        );
    }

    public List<SaleResponse> toResponseList(List<Sale> sales) {
        if (sales == null || sales.isEmpty()) {
            return Collections.emptyList();
        }

        return sales.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private BigDecimal toAmount(Double amount) {
        return amount == null ? BigDecimal.ZERO : BigDecimal.valueOf(amount);
    }

    private Double toDouble(BigDecimal amount) {
        return amount == null ? null : amount.doubleValue();
    }

    private String valueOrDefault(String value, String defaultValue) {
        return value == null || value.isBlank() ? defaultValue : value;
    }
}
