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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductMapper productMapper;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductSpecification productSpecification;

    @Mock
    private ApplicationEventPublisher applicationEventPublisher;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    @Test
    void createProduct_shouldCreateProductAndPublishEvent() {
        CreateProductRequest request = new CreateProductRequest(
                "Rice",
                "Long grain rice",
                "SKU-1",
                "BAR-1",
                new BigDecimal("100.00"),
                1L,
                4,
                "Warehouse A"
        );

        Product product = new Product();
        product.setName(request.name());
        product.setDescription(request.description());
        product.setSku(request.sku());
        product.setBarcode(request.barcode());
        product.setPrice(request.price());

        ProductResponse mappedResponse = new ProductResponse(
                5L,
                request.name(),
                request.description(),
                request.sku(),
                request.barcode(),
                request.price(),
                "Groceries",
                null
        );

        when(productRepository.existsByName(request.name())).thenReturn(false);
        when(productRepository.existsByBarcode(request.barcode())).thenReturn(false);
        when(productRepository.existsBySku(request.sku())).thenReturn(false);
        when(productMapper.toEntity(request)).thenReturn(product);
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> {
            Product saved = invocation.getArgument(0);
            saved.setId(5L);
            return saved;
        });
        when(productMapper.toResponse(product)).thenReturn(mappedResponse);

        ProductResponse result = productService.createProduct(request);

        assertEquals(request.quantity(), result.quantity());
        assertEquals(mappedResponse.productId(), result.productId());
        assertEquals(mappedResponse.productName(), result.productName());

        ArgumentCaptor<ProductCreatedEvent> eventCaptor = ArgumentCaptor.forClass(ProductCreatedEvent.class);
        verify(applicationEventPublisher).publishEvent(eventCaptor.capture());
        assertEquals(5L, eventCaptor.getValue().productId());
        assertEquals(request.quantity(), eventCaptor.getValue().quantity());
        assertEquals(request.warehouseLocation(), eventCaptor.getValue().warehouseLocation());
    }

    @Test
    void createProduct_shouldThrowWhenProductAlreadyExistsByName() {
        CreateProductRequest request = new CreateProductRequest(
                "Rice",
                "Long grain rice",
                "SKU-1",
                "BAR-1",
                new BigDecimal("100.00"),
                1L,
                4,
                "Warehouse A"
        );

        when(productRepository.existsByName(request.name())).thenReturn(true);

        assertThrows(BusinessException.class, () -> productService.createProduct(request));

        verify(productRepository).existsByName(request.name());
        verify(productRepository, never()).existsByBarcode(anyString());
        verify(productRepository, never()).existsBySku(anyString());
        verify(productMapper, never()).toEntity(any());
        verify(productRepository, never()).save(any());
        verify(applicationEventPublisher, never()).publishEvent(any());
    }

    @Test
    void getAllProducts_shouldReturnPagedResponse() {
        FilterProductRequest filterRequest = new FilterProductRequest("Rice", null, null, null, null, null);
        PaginationRequest paginationRequest = PaginationRequest.builder()
                .pageNo(0)
                .pageSize(5)
                .sortBy("name")
                .sortDirection("asc")
                .build();

        Product product = new Product();
        product.setId(1L);
        product.setName("Rice");
        product.setDescription("Long grain rice");
        product.setSku("SKU-1");
        product.setBarcode("BAR-1");
        product.setPrice(new BigDecimal("100.00"));

        ProductResponse response = new ProductResponse(
                1L,
                product.getName(),
                product.getDescription(),
                product.getSku(),
                product.getBarcode(),
                product.getPrice(),
                "Groceries",
                12
        );

        Page<Product> productPage = new PageImpl<>(
                List.of(product),
                PageRequest.of(0, 5, Sort.by(Sort.Direction.ASC, "name")),
                1
        );

        when(productSpecification.filterProduct(filterRequest)).thenReturn((root, query, cb) -> cb.conjunction());
        when(productRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(productPage);
        when(productMapper.toResponse(product)).thenReturn(response);

        PagedResponse<ProductResponse> result = productService.getAllProducts(filterRequest, paginationRequest);

        assertEquals(List.of(response), result.content());
        assertEquals(1L, result.totalElements());
        assertEquals(1, result.page());
        assertEquals(5, result.size());
        verify(productSpecification).filterProduct(filterRequest);
        verify(productRepository).findAll(any(Specification.class), any(Pageable.class));
        verify(productMapper).toResponse(product);
    }

    @Test
    void updateProduct_shouldUpdateProvidedFields() {
        Long id = 1L;
        Product product = new Product();
        product.setId(id);
        product.setName("Rice");
        product.setDescription("Long grain rice");
        product.setSku("SKU-1");
        product.setBarcode("BAR-1");
        product.setPrice(new BigDecimal("100.00"));

        UpdateProductRequest request = new UpdateProductRequest(
                id,
                "Rice Premium",
                "Premium long grain rice",
                "SKU-2",
                "BAR-2",
                new BigDecimal("125.00")
        );

        ProductResponse response = new ProductResponse(
                id,
                request.name(),
                request.description(),
                request.sku(),
                request.barcode(),
                request.price(),
                "Groceries",
                12
        );

        when(productRepository.findById(id)).thenReturn(Optional.of(product));
        when(productMapper.toResponse(product)).thenReturn(response);

        ProductResponse result = productService.updateProduct(request);

        assertEquals(response, result);
        assertEquals(request.name(), product.getName());
        assertEquals(request.description(), product.getDescription());
        assertEquals(request.sku(), product.getSku());
        assertEquals(request.barcode(), product.getBarcode());
        assertEquals(request.price(), product.getPrice());

        ArgumentCaptor<Product> productCaptor = ArgumentCaptor.forClass(Product.class);
        verify(productMapper).toResponse(productCaptor.capture());
        assertEquals(request.name(), productCaptor.getValue().getName());
        assertEquals(request.description(), productCaptor.getValue().getDescription());
    }

    @Test
    void updateProduct_shouldThrowWhenProductMissing() {
        Long id = 1L;
        UpdateProductRequest request = new UpdateProductRequest(
                id,
                "Rice Premium",
                "Premium long grain rice",
                "SKU-2",
                "BAR-2",
                new BigDecimal("125.00")
        );

        when(productRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.updateProduct(request));

        verify(productRepository).findById(id);
        verify(productMapper, never()).toResponse(any());
    }

    @Test
    void getProduct_shouldThrowWhenProductMissing() {
        Long id = 1L;
        when(productRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.getProduct(id));

        verify(productRepository).findById(id);
        verify(productMapper, never()).toResponse(any());
    }

    @Test
    void deleteProduct_shouldThrowWhenDeleteFails() {
        Long id = 1L;
        when(productRepository.deleteProduct(id)).thenReturn(0);

        assertThrows(BusinessException.class, () -> productService.deleteProduct(id));

        verify(productRepository).deleteProduct(id);
    }
}
