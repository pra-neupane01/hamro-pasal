package com.praladneupane.hamropasal.customer.controller;

import com.praladneupane.hamropasal.common.dto.request.PaginationRequest;
import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.customer.dto.request.CreateCustomerRequest;
import com.praladneupane.hamropasal.customer.dto.request.UpdateCustomerRequest;
import com.praladneupane.hamropasal.customer.dto.response.CustomerResponse;
import com.praladneupane.hamropasal.customer.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<APIResponse<CustomerResponse>> createCustomer(
            @RequestBody @Valid CreateCustomerRequest request) {
        CustomerResponse customer = customerService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(APIResponse.success("Customer created successfully", customer));
    }

    @PutMapping
    public ResponseEntity<APIResponse<CustomerResponse>> updateCustomer(
            @RequestBody @Valid UpdateCustomerRequest request) {
        CustomerResponse customer = customerService.update(request);
        return ResponseEntity.ok(APIResponse.success("Customer updated successfully", customer));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<CustomerResponse>> getCustomerById(@PathVariable Long id) {
        CustomerResponse customer = customerService.getById(id);
        return ResponseEntity.ok(APIResponse.success("Customer fetched successfully", customer));
    }

    @GetMapping
    public ResponseEntity<APIResponse<PagedResponse<CustomerResponse>>> searchCustomers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean active,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PagedResponse<CustomerResponse> customers = customerService.search(
                search, active, PageRequest.of(page, size));
        return ResponseEntity.ok(APIResponse.success("Customers fetched successfully", customers));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse<Void>> deleteCustomer(@PathVariable Long id) {
        customerService.delete(id);
        return ResponseEntity.ok(APIResponse.success("Customer deleted successfully", null));
    }
}
