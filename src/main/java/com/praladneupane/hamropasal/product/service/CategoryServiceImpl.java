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
    public CategoryResponse getCategory(Long id) {
        Category category = findCategory(id);
        return categoryMapper.toResponse(category);
    }

    private Category findCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Category Not Found"));
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(UpdateCategoryRequest request, Long categoryId) {
        Category category = findCategory(categoryId);
        if (request.name() != null) {
            category.setName(request.name());
        }
        if (request.description() != null) {
            category.setDescription(request.description());
        }
        return categoryMapper.toResponse(category);
    }

    @Override
    public void deleteCategory(Long id) {
        int rowsDeleted = categoryRepository.deleteCategory(id);
        if (rowsDeleted <= 0) {
            throw new BusinessException("Failed to delete the category");
        }
    }


    private void checkIfCategoryExists(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new BusinessException("Category Already Exists!");
        }
    }
}
