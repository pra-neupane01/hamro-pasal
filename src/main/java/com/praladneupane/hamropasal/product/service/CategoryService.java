package com.praladneupane.hamropasal.product.service;

import com.praladneupane.hamropasal.product.dto.request.CreateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CreateCategoryRequest request);

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategory(Long id);

    CategoryResponse updateCategory(UpdateCategoryRequest request, Long categoryId);

    void deleteCategory(Long id);


}
