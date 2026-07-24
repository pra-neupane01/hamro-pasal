package com.praladneupane.hamropasal.product.service;

import com.praladneupane.hamropasal.common.dto.request.PaginationRequest;
import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.product.dto.request.CreateProductRequest;
import com.praladneupane.hamropasal.product.dto.request.FilterProductRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateProductRequest;
import com.praladneupane.hamropasal.product.dto.response.ProductResponse;

public interface ProductService {
    ProductResponse createProduct(CreateProductRequest request);

    PagedResponse<ProductResponse> getAllProducts(FilterProductRequest request, PaginationRequest paginationRequest);

    ProductResponse updateProduct(UpdateProductRequest request);

    ProductResponse getProduct(Long id);

    void deleteProduct(Long id);
}
