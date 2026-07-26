package com.praladneupane.hamropasal.inventory.controller;

import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import com.praladneupane.hamropasal.common.dto.response.LowStockNotification;
import com.praladneupane.hamropasal.inventory.dto.request.RestockProductRequest;
import com.praladneupane.hamropasal.inventory.dto.request.SellProductRequest;
import com.praladneupane.hamropasal.inventory.dto.request.UpdateInventoryThresholdRequest;
import com.praladneupane.hamropasal.inventory.dto.response.InventoryResponse;
import com.praladneupane.hamropasal.inventory.dto.response.InventoryUpdateResponse;
import com.praladneupane.hamropasal.inventory.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<APIResponse<List<InventoryResponse>>> getAllInventory() {
        List<InventoryResponse> response = inventoryService.getAllInventory();
        return ResponseEntity.ok(APIResponse.success("Inventory fetched successfully", response));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<APIResponse<List<LowStockNotification>>> getLowStockItems() {
        List<LowStockNotification> response = inventoryService.getLowStockProducts();
        return ResponseEntity.ok(APIResponse.success("Low stock items fetched successfully", response));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<APIResponse<InventoryResponse>> getInventoryByProduct(@PathVariable Long productId) {
        InventoryResponse response = inventoryService.getInventoryByProductId(productId);
        return ResponseEntity.ok(APIResponse.success("Inventory fetched successfully", response));
    }

    @PostMapping("/restock")
    public ResponseEntity<APIResponse<InventoryUpdateResponse>> restockProduct(
            @RequestBody @Valid RestockProductRequest request) {
        InventoryUpdateResponse response = inventoryService.restockProduct(request);
        return ResponseEntity.ok(APIResponse.success("Product restocked successfully", response));
    }

    @PostMapping("/sell")
    public ResponseEntity<APIResponse<InventoryUpdateResponse>> sellProduct(
            @RequestBody @Valid SellProductRequest request) {
        InventoryUpdateResponse response = inventoryService.reduceStock(request);
        return ResponseEntity.ok(APIResponse.success("Product sold successfully", response));
    }

    @PatchMapping("/threshold")
    public ResponseEntity<APIResponse<InventoryUpdateResponse>> updateThreshold(
            @RequestBody @Valid UpdateInventoryThresholdRequest request) {
        InventoryUpdateResponse response = inventoryService.updateThreshold(request);
        return ResponseEntity.ok(APIResponse.success("Threshold updated successfully", response));
    }
}
