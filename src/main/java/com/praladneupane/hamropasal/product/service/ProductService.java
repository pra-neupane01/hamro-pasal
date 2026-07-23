package com.praladneupane.hamropasal.product.service;

import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.product.dto.request.CreateProductRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateProductRequest;
import com.praladneupane.hamropasal.product.dto.response.ProductResponse;

public interface ProductService {
    ProductResponse createProduct(CreateProductRequest request);

    PagedResponse<ProductResponse> getAllProducts();

    ProductResponse updateProduct(UpdateProductRequest request);
}
