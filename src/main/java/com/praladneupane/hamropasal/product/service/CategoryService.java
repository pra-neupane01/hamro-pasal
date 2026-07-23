package com.praladneupane.hamropasal.product.service;

import com.praladneupane.hamropasal.product.dto.request.CreateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.response.CategoryResponse;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    CategoryResponse createCategory(CreateCategoryRequest request);

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategory(UUID id);

    CategoryResponse updateCategory(UpdateCategoryRequest request, UUID categoryId);

}
