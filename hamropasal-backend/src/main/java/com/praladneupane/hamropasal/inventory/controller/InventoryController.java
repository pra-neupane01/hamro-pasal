package com.praladneupane.hamropasal.inventory.controller;

import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import com.praladneupane.hamropasal.inventory.dto.request.RestockProductRequest;
import com.praladneupane.hamropasal.inventory.dto.request.SellProductRequest;
import com.praladneupane.hamropasal.inventory.dto.response.InventoryUpdateResponse;
import com.praladneupane.hamropasal.inventory.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inevntory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @PostMapping("/restock")
    public ResponseEntity<APIResponse<InventoryUpdateResponse>> restockProduct(@RequestBody @Valid RestockProductRequest request) {
        var response = inventoryService.restockProduct(request);
        return ResponseEntity.ok(APIResponse.success("Product restocked successfully", response));
    }

    @PostMapping("/sell")
    public ResponseEntity<APIResponse<InventoryUpdateResponse>> sellProduct(@RequestBody @Valid SellProductRequest request) {
        var response = inventoryService.reduceStock(request);
        return ResponseEntity.ok(APIResponse.success("Product sold successfully", response));
    }
}
