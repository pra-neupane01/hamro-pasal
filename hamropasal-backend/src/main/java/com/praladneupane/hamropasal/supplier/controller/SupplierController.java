package com.praladneupane.hamropasal.supplier.controller;

import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import com.praladneupane.hamropasal.supplier.dto.request.CreateSupplierRequest;
import com.praladneupane.hamropasal.supplier.dto.request.UpdateSupplierRequest;
import com.praladneupane.hamropasal.supplier.dto.response.SupplierResponse;
import com.praladneupane.hamropasal.supplier.service.SupplierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping
    public ResponseEntity<APIResponse<List<SupplierResponse>>> getAllSuppliers() {
        List<SupplierResponse> suppliers = supplierService.getAllSuppliers();
        return ResponseEntity.ok(APIResponse.success("Suppliers fetched successfully", suppliers));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<SupplierResponse>> getSupplierById(@PathVariable Long id) {
        SupplierResponse supplier = supplierService.getSupplierById(id);
        return ResponseEntity.ok(APIResponse.success("Supplier fetched successfully", supplier));
    }

    @PostMapping
    public ResponseEntity<APIResponse<SupplierResponse>> createSupplier(
            @RequestBody @Valid CreateSupplierRequest request) {
        SupplierResponse supplier = supplierService.createSupplier(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(APIResponse.success("Supplier created successfully", supplier));
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse<SupplierResponse>> updateSupplier(
            @PathVariable Long id,
            @RequestBody @Valid UpdateSupplierRequest request) {
        SupplierResponse supplier = supplierService.updateSupplier(id, request);
        return ResponseEntity.ok(APIResponse.success("Supplier updated successfully", supplier));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse<Void>> deleteSupplier(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
        return ResponseEntity.ok(APIResponse.success("Supplier deleted successfully", null));
    }

    @GetMapping("/search")
    public ResponseEntity<APIResponse<List<SupplierResponse>>> searchSuppliers(
            @RequestParam String query) {
        List<SupplierResponse> suppliers = supplierService.searchSuppliers(query);
        return ResponseEntity.ok(APIResponse.success("Search results", suppliers));
    }
}
