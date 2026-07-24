package com.praladneupane.hamropasal.sale.service.impl;

import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.inventory.entity.Inventory;
import com.praladneupane.hamropasal.inventory.repository.InventoryRepository;
import com.praladneupane.hamropasal.product.entity.Product;
import com.praladneupane.hamropasal.product.repository.ProductRepository;
import com.praladneupane.hamropasal.sale.dto.request.CreateSaleRequest;
import com.praladneupane.hamropasal.sale.dto.request.SaleItemRequest;
import com.praladneupane.hamropasal.sale.dto.response.SaleResponse;
import com.praladneupane.hamropasal.sale.entity.Sale;
import com.praladneupane.hamropasal.sale.entity.SaleItem;
import com.praladneupane.hamropasal.sale.mapper.SaleMapper;
import com.praladneupane.hamropasal.sale.repository.SaleRepository;
import com.praladneupane.hamropasal.sale.service.SaleService;
import com.praladneupane.hamropasal.user.model.User;
import com.praladneupane.hamropasal.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final InventoryRepository inventoryRepository;
    private final SaleMapper saleMapper;

    @Override
    @Transactional
    public SaleResponse processSale(CreateSaleRequest request, String cashierEmail) {
        validateRequest(request);

        User cashier = userRepository.findByEmail(cashierEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Cashier not found with email: " + cashierEmail));

        List<SaleItem> saleItems = new ArrayList<>();
        for (SaleItemRequest itemRequest : request.items()) {
            validateItemRequest(itemRequest);

            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Product not found with ID: " + itemRequest.productId()));

            decrementInventory(product, itemRequest.quantity());
            saleItems.add(saleMapper.toItemEntity(itemRequest, product));
        }

        Sale sale = saleMapper.toEntity(request, cashier, saleItems);
        Sale savedSale = saleRepository.save(sale);

        return saleMapper.toResponse(savedSale);
    }

    @Override
    @Transactional(readOnly = true)
    public SaleResponse getSaleById(Long id) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sale receipt not found with ID: " + id));

        return saleMapper.toResponse(sale);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SaleResponse> getAllSales() {
        List<Sale> sales = saleRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        return saleMapper.toResponseList(sales);
    }

    private void validateRequest(CreateSaleRequest request) {
        if (request == null) {
            throw new BusinessException("Sale request is required");
        }
        if (request.items() == null || request.items().isEmpty()) {
            throw new BusinessException("Sale must contain at least one item");
        }
        if (request.paymentMethod() == null) {
            throw new BusinessException("Payment method is required");
        }
        if (request.taxAmount() != null && request.taxAmount() < 0) {
            throw new BusinessException("Tax amount cannot be negative");
        }
    }

    private void validateItemRequest(SaleItemRequest itemRequest) {
        if (itemRequest == null) {
            throw new BusinessException("Sale item is required");
        }
        if (itemRequest.productId() == null) {
            throw new BusinessException("Product ID is required");
        }
        if (itemRequest.quantity() == null || itemRequest.quantity() <= 0) {
            throw new BusinessException("Quantity must be greater than zero");
        }
    }

    private void decrementInventory(Product product, Integer quantitySold) {
        Inventory inventory = inventoryRepository.findByProductId(product.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Inventory not found for product ID: " + product.getId()));

        int availableQuantity = inventory.getQuantityInStock();
        if (availableQuantity < quantitySold) {
            throw new BusinessException("Insufficient stock for product: " + product.getName());
        }

        inventory.setQuantityInStock(availableQuantity - quantitySold);
        inventoryRepository.save(inventory);
    }
}
