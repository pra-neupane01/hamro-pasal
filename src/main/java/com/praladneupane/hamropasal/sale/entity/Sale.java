package com.praladneupane.hamropasal.sale.entity;

import com.praladneupane.hamropasal.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sales")
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class Sale extends BaseEntity {

    @Column(name = "cashier_name")
    private String cashierName;

    @Column(name = "cashier_email")
    private String cashierEmail;

    @Column(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "sales_date")
    private String saleDate;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "tax_amount")
    private BigDecimal taxAmount;

    @Column(name = "net_amount")
    private BigDecimal netAmount;

    @OneToMany(mappedBy = "sale", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<SaleItem> saleItems = new ArrayList<>();
}
