package com.praladneupane.hamropasal.product.controller;

import com.praladneupane.hamropasal.common.dto.request.PaginationRequest;
import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.product.dto.request.CreateProductRequest;
import com.praladneupane.hamropasal.product.dto.request.FilterProductRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateProductRequest;
import com.praladneupane.hamropasal.product.dto.response.ProductResponse;
import com.praladneupane.hamropasal.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<APIResponse<ProductResponse>> addProduct(@RequestBody @Valid CreateProductRequest request) {
        var response = productService.createProduct(request);
        return ResponseEntity.ok(APIResponse.success("Product Added Successfully", response));
    }

    @GetMapping
    public ResponseEntity<APIResponse<PagedResponse<ProductResponse>>> getProducts(
            @ModelAttribute PaginationRequest paginationRequest,
            @ModelAttribute FilterProductRequest filterProductRequest
    ) {
        var response = productService.getAllProducts(filterProductRequest, paginationRequest);
        return ResponseEntity.ok(APIResponse.success("Products fetched successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<ProductResponse>> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(APIResponse.success("Product fetched successfully", productService.getProduct(id)));
    }

    @PutMapping
    public ResponseEntity<APIResponse<ProductResponse>> updateProduct(@RequestBody @Valid UpdateProductRequest request) {
        return ResponseEntity.ok(APIResponse.success("Product updated successfully", productService.updateProduct(request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse<String>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(APIResponse.success("Product deleted successfully", "Deleted"));
    }
}
