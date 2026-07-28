package com.praladneupane.hamropasal.customer.service;

import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.customer.dto.request.CreateCustomerRequest;
import com.praladneupane.hamropasal.customer.dto.request.UpdateCustomerRequest;
import com.praladneupane.hamropasal.customer.dto.response.CustomerResponse;
import com.praladneupane.hamropasal.customer.entity.Customer;
import com.praladneupane.hamropasal.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public CustomerResponse create(CreateCustomerRequest request) {
        if (request.email() != null && customerRepository.existsByEmail(request.email())) {
            throw new BusinessException("A customer with this email already exists");
        }
        if (customerRepository.existsByPhone(request.phone())) {
            throw new BusinessException("A customer with this phone number already exists");
        }
        Customer customer = Customer.builder()
                .fullName(request.fullName())
                .email(request.email())
                .phone(request.phone())
                .address(request.address())
                .city(request.city())
                .build();
        return toResponse(customerRepository.save(customer));
    }

    @Override
    @Transactional
    public CustomerResponse update(UpdateCustomerRequest request) {
        Customer customer = findById(request.id());
        if (request.fullName() != null) customer.setFullName(request.fullName());
        if (request.email() != null) customer.setEmail(request.email());
        if (request.phone() != null) customer.setPhone(request.phone());
        if (request.address() != null) customer.setAddress(request.address());
        if (request.city() != null) customer.setCity(request.city());
        return toResponse(customerRepository.save(customer));
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponse getById(Long id) {
        return toResponse(findById(id));
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<CustomerResponse> search(String search, Boolean active, Pageable pageable) {
        Page<Customer> page = customerRepository.search(search, active, pageable);
        return PagedResponse.toPagedResponse(page.map(this::toResponse));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Customer customer = findById(id);
        customer.setDeleted(true);
        customerRepository.save(customer);
    }

    @Override
    public long countActive() {
        return customerRepository.countByActiveTrue();
    }

    private Customer findById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));
    }

    private CustomerResponse toResponse(Customer c) {
        return CustomerResponse.builder()
                .id(c.getId())
                .fullName(c.getFullName())
                .email(c.getEmail())
                .phone(c.getPhone())
                .address(c.getAddress())
                .city(c.getCity())
                .totalPurchases(c.getTotalPurchases())
                .loyaltyPoints(c.getLoyaltyPoints())
                .active(c.isActive())
                .createdAt(c.getCreatedAt())
                .build();
    }
}
