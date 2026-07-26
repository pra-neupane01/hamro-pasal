package com.praladneupane.hamropasal.product.controller;

import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import com.praladneupane.hamropasal.product.dto.request.CreateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.response.CategoryResponse;
import com.praladneupane.hamropasal.product.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.DeleteExchange;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<APIResponse<CategoryResponse>> createCategory(@RequestBody @Valid CreateCategoryRequest request) {
        var category = categoryService.createCategory(request);
        return ResponseEntity.ok(APIResponse.success("Category added successfully", category));
    }

    @GetMapping
    public ResponseEntity<APIResponse<List<CategoryResponse>>> getCategories() {
        return ResponseEntity.ok(APIResponse.success("Category fetched successfully", categoryService.getAllCategories()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<CategoryResponse>> getCategory(@PathVariable Long id) {
        return ResponseEntity.ok(APIResponse.success("Category fetched successfully", categoryService.getCategory(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse<CategoryResponse>> updateCategory(
            @Valid @RequestBody UpdateCategoryRequest request,
            @PathVariable Long id) {
        return ResponseEntity.ok(APIResponse.success("Category updated successfully",
                categoryService.updateCategory(request, id)));
    }

    @DeleteExchange("/{id}")
    public ResponseEntity<APIResponse<String>> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(APIResponse.success("Category deleted successfully", "Deleted"));
    }

}
