package com.praladneupane.hamropasal.customer.service;

import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.customer.dto.request.CreateCustomerRequest;
import com.praladneupane.hamropasal.customer.dto.request.UpdateCustomerRequest;
import com.praladneupane.hamropasal.customer.dto.response.CustomerResponse;
import org.springframework.data.domain.Pageable;

public interface CustomerService {
    CustomerResponse create(CreateCustomerRequest request);
    CustomerResponse update(UpdateCustomerRequest request);
    CustomerResponse getById(Long id);
    PagedResponse<CustomerResponse> search(String search, Boolean active, Pageable pageable);
    void delete(Long id);
    long countActive();
}
