package com.praladneupane.hamropasal.supplier.dto.request;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSupplierRequest {

    private String companyName;

    private String contactPerson;

    @Email(message = "Email should be valid")
    private String email;

    private String phone;

    private String address;

    private String city;

    private String paymentTerms;

    private Boolean active;
}
