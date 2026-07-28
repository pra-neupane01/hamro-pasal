package com.praladneupane.hamropasal.supplier.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupplierResponse {

    private Long id;

    private String companyName;

    private String contactPerson;

    private String email;

    private String phone;

    private String address;

    private String city;

    private String paymentTerms;

    private Double totalSupplied;

    private boolean active;
}
