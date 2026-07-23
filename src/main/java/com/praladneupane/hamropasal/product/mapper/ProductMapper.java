package com.praladneupane.hamropasal.product.mapper;

import com.praladneupane.hamropasal.product.dto.request.CreateProductRequest;
import com.praladneupane.hamropasal.product.dto.response.ProductResponse;
import com.praladneupane.hamropasal.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true)
    Product toEntity(CreateProductRequest request);

    @Mapping(source = "id", target = "productId")
    @Mapping(source = "name", target = "productName")
    @Mapping(source = "category.name", target = "categoryName")
    ProductResponse toResponse(Product product);
}
