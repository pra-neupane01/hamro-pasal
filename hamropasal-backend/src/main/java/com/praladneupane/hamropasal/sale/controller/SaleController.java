package com.praladneupane.hamropasal.sale.controller;

import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.sale.dto.request.CreateSaleRequest;
import com.praladneupane.hamropasal.sale.dto.response.SaleResponse;
import com.praladneupane.hamropasal.sale.service.SaleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;

    @PostMapping
    public ResponseEntity<APIResponse<SaleResponse>> processSale(
            @Valid @RequestBody CreateSaleRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            throw new BusinessException("Authenticated cashier is required");
        }

        SaleResponse response = saleService.processSale(request, userDetails.getUsername());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(APIResponse.success("Checkout transaction completed successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<SaleResponse>> getSaleById(@PathVariable Long id) {
        SaleResponse response = saleService.getSaleById(id);
        return ResponseEntity.ok(APIResponse.success("Sale details fetched successfully", response));
    }

    @GetMapping
    public ResponseEntity<APIResponse<List<SaleResponse>>> getAllSales() {
        List<SaleResponse> response = saleService.getAllSales();
        return ResponseEntity.ok(APIResponse.success("Sales history fetched successfully", response));
    }
}
