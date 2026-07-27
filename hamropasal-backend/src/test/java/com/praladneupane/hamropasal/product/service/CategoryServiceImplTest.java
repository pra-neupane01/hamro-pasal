package com.praladneupane.hamropasal.product.service;

import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.product.dto.request.CreateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.response.CategoryResponse;
import com.praladneupane.hamropasal.product.entity.Category;
import com.praladneupane.hamropasal.product.mapper.CategoryMapper;
import com.praladneupane.hamropasal.product.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CategoryServiceImplTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private CategoryMapper categoryMapper;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Test
    void createCategory_shouldCreateCategorySuccessfully() {
        CreateCategoryRequest request = new CreateCategoryRequest("Groceries", "Daily grocery items");
        Category category = new Category();
        category.setName(request.name());
        category.setDescription(request.description());
        CategoryResponse response = new CategoryResponse(1L, request.name(), request.description());

        when(categoryRepository.existsByName(request.name())).thenReturn(false);
        when(categoryMapper.toEntity(request)).thenReturn(category);
        when(categoryRepository.save(category)).thenAnswer(invocation -> {
            Category saved = invocation.getArgument(0);
            saved.setId(1L);
            return saved;
        });
        when(categoryMapper.toResponse(category)).thenReturn(response);

        CategoryResponse result = categoryService.createCategory(request);

        assertEquals(response, result);
        verify(categoryRepository).existsByName(request.name());
        verify(categoryMapper).toEntity(request);
        verify(categoryRepository).save(category);
        verify(categoryMapper).toResponse(category);
    }

    @Test
    void createCategory_shouldThrowWhenCategoryAlreadyExists() {
        CreateCategoryRequest request = new CreateCategoryRequest("Groceries", "Daily grocery items");
        when(categoryRepository.existsByName(request.name())).thenReturn(true);

        assertThrows(BusinessException.class, () -> categoryService.createCategory(request));

        verify(categoryRepository).existsByName(request.name());
        verify(categoryMapper, never()).toEntity(any());
        verify(categoryRepository, never()).save(any());
        verify(categoryMapper, never()).toResponse(any());
    }

    @Test
    void getAllCategories_shouldReturnMappedCategories() {
        Category first = new Category();
        first.setId(1L);
        first.setName("Groceries");
        first.setDescription("Daily grocery items");

        Category second = new Category();
        second.setId(2L);
        second.setName("Beverages");
        second.setDescription("Drinks");

        CategoryResponse firstResponse = new CategoryResponse(1L, first.getName(), first.getDescription());
        CategoryResponse secondResponse = new CategoryResponse(2L, second.getName(), second.getDescription());

        when(categoryRepository.findAll()).thenReturn(List.of(first, second));
        when(categoryMapper.toResponse(first)).thenReturn(firstResponse);
        when(categoryMapper.toResponse(second)).thenReturn(secondResponse);

        List<CategoryResponse> result = categoryService.getAllCategories();

        assertEquals(List.of(firstResponse, secondResponse), result);
        verify(categoryRepository).findAll();
        verify(categoryMapper).toResponse(first);
        verify(categoryMapper).toResponse(second);
    }

    @Test
    void getCategory_shouldReturnMappedCategory() {
        Long id = 1L;
        Category category = new Category();
        category.setId(id);
        category.setName("Groceries");
        category.setDescription("Daily grocery items");
        CategoryResponse response = new CategoryResponse(id, category.getName(), category.getDescription());

        when(categoryRepository.findById(id)).thenReturn(Optional.of(category));
        when(categoryMapper.toResponse(category)).thenReturn(response);

        CategoryResponse result = categoryService.getCategory(id);

        assertEquals(response, result);
        verify(categoryRepository).findById(id);
        verify(categoryMapper).toResponse(category);
    }

    @Test
    void updateCategory_shouldUpdateProvidedFields() {
        Long id = 1L;
        Category category = new Category();
        category.setId(id);
        category.setName("Groceries");
        category.setDescription("Daily grocery items");

        UpdateCategoryRequest request = new UpdateCategoryRequest("Fresh Groceries", "Fresh and chilled items");
        CategoryResponse response = new CategoryResponse(id, request.name(), request.description());

        when(categoryRepository.findById(id)).thenReturn(Optional.of(category));
        when(categoryMapper.toResponse(category)).thenReturn(response);

        CategoryResponse result = categoryService.updateCategory(request, id);

        assertEquals(response, result);
        assertEquals(request.name(), category.getName());
        assertEquals(request.description(), category.getDescription());

        ArgumentCaptor<Category> categoryCaptor = ArgumentCaptor.forClass(Category.class);
        verify(categoryMapper).toResponse(categoryCaptor.capture());
        assertEquals(request.name(), categoryCaptor.getValue().getName());
        assertEquals(request.description(), categoryCaptor.getValue().getDescription());
    }

    @Test
    void deleteCategory_shouldThrowWhenDeleteFails() {
        Long id = 1L;
        when(categoryRepository.deleteCategory(id)).thenReturn(0);

        assertThrows(BusinessException.class, () -> categoryService.deleteCategory(id));

        verify(categoryRepository).deleteCategory(id);
    }

    @Test
    void getCategory_shouldThrowWhenCategoryMissing() {
        Long id = 1L;
        when(categoryRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> categoryService.getCategory(id));

        verify(categoryRepository).findById(id);
        verify(categoryMapper, never()).toResponse(any());
    }
}
