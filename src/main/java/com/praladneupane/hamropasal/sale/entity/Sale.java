package com.praladneupane.hamropasal.sale.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sales")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Sale {
    @Column(name = "cashier_name")
    private String cashierName;

    @Column(name = "payment_method")
    private com.praladneupane.hamropasal.sale.entity.enums.PaymentMethod paymentMethod;

    @Column(name = "sales_date")
    private String saleDate;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "tax_amount")
    private BigDecimal taxAmount;

    @Column(name = "net_amount")
    private BigDecimal netAmount;

    @OneToMany(mappedBy = "sales", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<SaleItem> saleItems = new ArrayList<>();


}
