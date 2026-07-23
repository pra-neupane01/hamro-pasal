package com.praladneupane.hamropasal.product.service;

import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.product.dto.request.CreateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.response.CategoryResponse;
import com.praladneupane.hamropasal.product.entity.Category;
import com.praladneupane.hamropasal.product.mapper.CategoryMapper;
import com.praladneupane.hamropasal.product.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    @Transactional
    public CategoryResponse createCategory(CreateCategoryRequest request) {
        checkIfCategoryExists(request.name());
        Category category = categoryMapper.toEntity(request);
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Transactional(readOnly = true)
    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public CategoryResponse getCategory(UUID id) {
        Category category = findCategory(id);
        return categoryMapper.toResponse(category);
    }

    private Category findCategory(UUID id) {
        return categoryRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Category Not Found"));
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(UpdateCategoryRequest request, UUID categoryId) {
        Category category = findCategory(categoryId);
        if (request.name() != null) {
            category.setName(request.name());
        }
        if (request.description() != null) {
            category.setDescription(request.description());
        }
        return categoryMapper.toResponse(category);
    }


    private void checkIfCategoryExists(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new BusinessException("Category Already Exists!");
        }
    }
}
