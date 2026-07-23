package com.praladneupane.hamropasal.product.mapper;

import com.praladneupane.hamropasal.product.dto.request.CreateCategoryRequest;
import com.praladneupane.hamropasal.product.dto.response.CategoryResponse;
import com.praladneupane.hamropasal.product.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(target = "id", ignore = true)
    Category toEntity(CreateCategoryRequest request);

    CategoryResponse toResponse(Category category);
}
