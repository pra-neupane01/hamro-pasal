package com.praladneupane.hamropasal.supplier.service;

import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.supplier.dto.request.CreateSupplierRequest;
import com.praladneupane.hamropasal.supplier.dto.request.UpdateSupplierRequest;
import com.praladneupane.hamropasal.supplier.dto.response.SupplierResponse;
import com.praladneupane.hamropasal.supplier.entity.Supplier;
import com.praladneupane.hamropasal.supplier.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SupplierResponse> getAllSuppliers() {
        return supplierRepository.findByActiveTrue().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SupplierResponse getSupplierById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));
        return toResponse(supplier);
    }

    @Override
    public SupplierResponse createSupplier(CreateSupplierRequest request) {
        // Check if phone already exists
        if (supplierRepository.findByPhone(request.getPhone()).isPresent()) {
            throw new ResourceNotFoundException("Supplier with this phone number already exists");
        }

        // Check if email already exists (if provided)
        if (request.getEmail() != null && supplierRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResourceNotFoundException("Supplier with this email already exists");
        }

        Supplier supplier = Supplier.builder()
                .companyName(request.getCompanyName())
                .contactPerson(request.getContactPerson())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .paymentTerms(request.getPaymentTerms())
                .active(true)
                .build();

        supplier = supplierRepository.save(supplier);
        return toResponse(supplier);
    }

    @Override
    public SupplierResponse updateSupplier(Long id, UpdateSupplierRequest request) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));

        if (request.getCompanyName() != null) {
            supplier.setCompanyName(request.getCompanyName());
        }
        if (request.getContactPerson() != null) {
            supplier.setContactPerson(request.getContactPerson());
        }
        if (request.getEmail() != null) {
            supplier.setEmail(request.getEmail());
        }
        if (request.getPhone() != null) {
            supplier.setPhone(request.getPhone());
        }
        if (request.getAddress() != null) {
            supplier.setAddress(request.getAddress());
        }
        if (request.getCity() != null) {
            supplier.setCity(request.getCity());
        }
        if (request.getPaymentTerms() != null) {
            supplier.setPaymentTerms(request.getPaymentTerms());
        }
        if (request.getActive() != null) {
            supplier.setActive(request.getActive());
        }

        supplier = supplierRepository.save(supplier);
        return toResponse(supplier);
    }

    @Override
    public void deleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));
        supplierRepository.delete(supplier);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SupplierResponse> searchSuppliers(String query) {
        return supplierRepository.findByCompanyNameContainingIgnoreCase(query).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private SupplierResponse toResponse(Supplier supplier) {
        return SupplierResponse.builder()
                .id(supplier.getId())
                .companyName(supplier.getCompanyName())
                .contactPerson(supplier.getContactPerson())
                .email(supplier.getEmail())
                .phone(supplier.getPhone())
                .address(supplier.getAddress())
                .city(supplier.getCity())
                .paymentTerms(supplier.getPaymentTerms())
                .totalSupplied(supplier.getTotalSupplied())
                .active(supplier.isActive())
                .build();
    }
}
