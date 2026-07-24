package com.praladneupane.hamropasal.product.service;

import com.praladneupane.hamropasal.common.dto.request.PaginationRequest;
import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.common.events.ProductCreatedEvent;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.product.dto.request.CreateProductRequest;
import com.praladneupane.hamropasal.product.dto.request.FilterProductRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateProductRequest;
import com.praladneupane.hamropasal.product.dto.response.ProductResponse;
import com.praladneupane.hamropasal.product.entity.Product;
import com.praladneupane.hamropasal.product.mapper.ProductMapper;
import com.praladneupane.hamropasal.product.repository.CategoryRepository;
import com.praladneupane.hamropasal.product.repository.ProductRepository;
import com.praladneupane.hamropasal.product.specifications.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;
    private final ProductSpecification productSpecification;
    private final ApplicationEventPublisher applicationEventPublisher;
    ProductRepository productRepository;

    @Override
    @Transactional
    public ProductResponse createProduct(CreateProductRequest request) {
        checkIfProductAlreadyExists(request.name(), request.sku(), request.barcode());
        Product product = productMapper.toEntity(request);
        Product savedProduct = productRepository.save(product);
        applicationEventPublisher.publishEvent(getEvent(request, savedProduct));
        return productMapper.toResponse(savedProduct);
    }

    private ProductCreatedEvent getEvent(CreateProductRequest request, Product product) {
        return ProductCreatedEvent.builder()
                .productId(product.getId())
                .quantity(request.quantity())
                .warehouseLocation(request.warehouseLocation())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<ProductResponse> getAllProducts(FilterProductRequest request, PaginationRequest paginationRequest) {
        Specification<Product> specification = productSpecification.filterProduct(request);
        Page<Product> productPage = productRepository.findAll(specification, paginationRequest.toPageable());
        Page<ProductResponse> responsePage = productPage.map(productMapper::toResponse);
        return PagedResponse.toPagedResponse(responsePage);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(UpdateProductRequest request) {
        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found"));
        updateProvidedFields(product, request);
        return productMapper.toResponse(product);

    }

    @Transactional(readOnly = true)
    @Override
    public ProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Product Not Found"));
        return productMapper.toResponse(product);
    }

    @Override
    public void deleteProduct(Long id) {
        int rowsDeleted = productRepository.deleteProduct(id);
        if (rowsDeleted <= 0) {
            throw new BusinessException("Failed to delete the product");
        }
    }


    // Private helpers methods
    private void checkIfProductAlreadyExists(String name, String sku, String barcode) {
        if (productRepository.existsByName(name)) {
            throw new BusinessException("Product Already Exists");
        }
        if (productRepository.existsByBarcode(barcode)) {
            throw new BusinessException("Product Already Exists");
        }
        if (productRepository.existsBySku(sku)) {
            throw new BusinessException("Product Already Exists");
        }
    }

    private void updateProvidedFields(Product product, UpdateProductRequest request) {
        if (request.name() != null) {
            product.setName(request.name());
        }
        if (request.description() != null) {
            product.setDescription(request.description());
        }
        if (request.sku() != null) {
            product.setSku(request.sku());
        }
        if (request.barcode() != null) {
            product.setBarcode(request.barcode());
        }
        if (request.price() != null) {
            product.setPrice(request.price());
        }
    }
}
