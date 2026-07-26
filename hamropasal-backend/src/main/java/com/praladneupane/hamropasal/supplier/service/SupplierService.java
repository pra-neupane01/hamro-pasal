package com.praladneupane.hamropasal.supplier.service;

import com.praladneupane.hamropasal.supplier.dto.request.CreateSupplierRequest;
import com.praladneupane.hamropasal.supplier.dto.request.UpdateSupplierRequest;
import com.praladneupane.hamropasal.supplier.dto.response.SupplierResponse;

import java.util.List;

public interface SupplierService {

    List<SupplierResponse> getAllSuppliers();

    SupplierResponse getSupplierById(Long id);

    SupplierResponse createSupplier(CreateSupplierRequest request);

    SupplierResponse updateSupplier(Long id, UpdateSupplierRequest request);

    void deleteSupplier(Long id);

    List<SupplierResponse> searchSuppliers(String query);
}
