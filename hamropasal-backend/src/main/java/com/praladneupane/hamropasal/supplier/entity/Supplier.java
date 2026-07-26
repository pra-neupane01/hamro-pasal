package com.praladneupane.hamropasal.supplier.entity;

import com.praladneupane.hamropasal.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "suppliers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Supplier extends BaseEntity {

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "contact_person", nullable = false)
    private String contactPerson;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "phone", nullable = false, unique = true)
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "payment_terms")
    private String paymentTerms;

    @Builder.Default
    @Column(name = "total_supplied")
    private Double totalSupplied = 0.0;

    @Builder.Default
    @Column(name = "active")
    private boolean active = true;
}
