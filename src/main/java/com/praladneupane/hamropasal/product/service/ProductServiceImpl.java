package com.praladneupane.hamropasal.product.service;

import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.product.dto.request.CreateProductRequest;
import com.praladneupane.hamropasal.product.dto.request.UpdateProductRequest;
import com.praladneupane.hamropasal.product.dto.response.ProductResponse;
import com.praladneupane.hamropasal.product.entity.Product;
import com.praladneupane.hamropasal.product.mapper.ProductMapper;
import com.praladneupane.hamropasal.product.repository.CategoryRepository;
import com.praladneupane.hamropasal.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;
    ProductRepository productRepository;

    @Override
    public ProductResponse createProduct(CreateProductRequest request) {
        checkIfProductAlreadyExists(request.name(), request.sku(), request.barcode());
        Product product = productMapper.toEntity(request);
        return productMapper.toResponse(productRepository.save(product));
    }


    @Override
    public PagedResponse<ProductResponse> getAllProducts() {
        return null;
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(UpdateProductRequest request) {
        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found"));
        updateProvidedFields(product, request);
        return productMapper.toResponse(product);

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
