package com.praladneupane.hamropasal.sale.service.impl;

import com.praladneupane.hamropasal.common.exception.BusinessException;
import com.praladneupane.hamropasal.common.exception.ResourceNotFoundException;
import com.praladneupane.hamropasal.inventory.entity.Inventory;
import com.praladneupane.hamropasal.inventory.repository.InventoryRepository;
import com.praladneupane.hamropasal.product.entity.Product;
import com.praladneupane.hamropasal.product.repository.ProductRepository;
import com.praladneupane.hamropasal.sale.dto.request.CreateSaleRequest;
import com.praladneupane.hamropasal.sale.dto.request.SaleItemRequest;
import com.praladneupane.hamropasal.sale.dto.response.SaleItemResponse;
import com.praladneupane.hamropasal.sale.dto.response.SaleResponse;
import com.praladneupane.hamropasal.sale.entity.PaymentMethod;
import com.praladneupane.hamropasal.sale.entity.Sale;
import com.praladneupane.hamropasal.sale.entity.SaleItem;
import com.praladneupane.hamropasal.sale.mapper.SaleMapper;
import com.praladneupane.hamropasal.sale.repository.SaleRepository;
import com.praladneupane.hamropasal.user.model.Role;
import com.praladneupane.hamropasal.user.model.User;
import com.praladneupane.hamropasal.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SaleServiceImplTest {

    @Mock
    private SaleRepository saleRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private InventoryRepository inventoryRepository;

    @Mock
    private SaleMapper saleMapper;

    @InjectMocks
    private SaleServiceImpl saleService;

    @Test
    void processSale_shouldProcessSaleSuccessfully() {
        String cashierEmail = "cashier@gmail.com";
        SaleItemRequest itemRequest = new SaleItemRequest(1L, 2);
        CreateSaleRequest request = new CreateSaleRequest(List.of(itemRequest), PaymentMethod.CASH, 10.0);

        User cashier = new User();
        cashier.setId(1L);
        cashier.setFullName("Cashier One");
        cashier.setEmail(cashierEmail);
        cashier.setRole(Role.CASHIER);

        Product product = new Product();
        product.setId(1L);
        product.setName("Rice");
        product.setBarcode("BAR-1");
        product.setPrice(new BigDecimal("50.00"));

        Inventory inventory = new Inventory();
        inventory.setId(11L);
        inventory.setProduct(product);
        inventory.setQuantityInStock(10);

        SaleItem saleItem = new SaleItem();
        saleItem.setId(21L);
        saleItem.setProduct(product);
        saleItem.setQuantity(2);
        saleItem.setUnitPrice(new BigDecimal("50.00"));
        saleItem.setSubtotal(new BigDecimal("100.00"));

        Sale sale = new Sale();
        sale.setId(31L);
        sale.setCashierName(cashier.getFullName());
        sale.setCashierEmail(cashier.getEmail());
        sale.setPaymentMethod(PaymentMethod.CASH);
        sale.setTotalAmount(new BigDecimal("100.00"));
        sale.setTaxAmount(new BigDecimal("10.00"));
        sale.setNetAmount(new BigDecimal("110.00"));
        sale.setSaleItems(List.of(saleItem));

        SaleItemResponse itemResponse = new SaleItemResponse(
                21L,
                product.getId(),
                product.getName(),
                product.getBarcode(),
                2,
                50.0,
                100.0
        );
        SaleResponse response = new SaleResponse(
                31L,
                cashier.getFullName(),
                cashier.getEmail(),
                100.0,
                10.0,
                110.0,
                PaymentMethod.CASH,
                List.of(itemResponse),
                LocalDateTime.of(2026, 7, 27, 12, 0)
        );

        when(userRepository.findByEmail(cashierEmail)).thenReturn(Optional.of(cashier));
        when(productRepository.findById(itemRequest.productId())).thenReturn(Optional.of(product));
        when(inventoryRepository.findByProductId(product.getId())).thenReturn(Optional.of(inventory));
        when(saleMapper.toItemEntity(itemRequest, product)).thenReturn(saleItem);
        when(saleMapper.toEntity(eq(request), eq(cashier), anyList())).thenReturn(sale);
        when(saleRepository.save(sale)).thenReturn(sale);
        when(saleMapper.toResponse(sale)).thenReturn(response);

        SaleResponse result = saleService.processSale(request, cashierEmail);

        assertEquals(response, result);
        assertEquals(8, inventory.getQuantityInStock());

        ArgumentCaptor<Inventory> inventoryCaptor = ArgumentCaptor.forClass(Inventory.class);
        verify(inventoryRepository).save(inventoryCaptor.capture());
        assertEquals(8, inventoryCaptor.getValue().getQuantityInStock());
        verify(userRepository).findByEmail(cashierEmail);
        verify(productRepository).findById(itemRequest.productId());
        verify(inventoryRepository).findByProductId(product.getId());
        verify(saleMapper).toItemEntity(itemRequest, product);
        verify(saleMapper).toEntity(eq(request), eq(cashier), anyList());
        verify(saleRepository).save(sale);
        verify(saleMapper).toResponse(sale);
    }

    @Test
    void processSale_shouldRejectEmptyItems() {
        CreateSaleRequest request = new CreateSaleRequest(List.of(), PaymentMethod.CASH, 0.0);

        assertThrows(BusinessException.class, () -> saleService.processSale(request, "cashier@gmail.com"));

        verifyNoInteractions(userRepository, productRepository, inventoryRepository, saleRepository, saleMapper);
    }

    @Test
    void processSale_shouldRejectInvalidItemQuantity() {
        String cashierEmail = "cashier@gmail.com";
        CreateSaleRequest request = new CreateSaleRequest(
                List.of(new SaleItemRequest(1L, 0)),
                PaymentMethod.CASH,
                0.0
        );

        User cashier = new User();
        cashier.setId(1L);
        cashier.setFullName("Cashier One");
        cashier.setEmail(cashierEmail);
        cashier.setRole(Role.CASHIER);

        when(userRepository.findByEmail(cashierEmail)).thenReturn(Optional.of(cashier));

        assertThrows(BusinessException.class, () -> saleService.processSale(request, cashierEmail));

        verify(userRepository).findByEmail(cashierEmail);
        verify(productRepository, never()).findById(anyLong());
        verify(inventoryRepository, never()).findByProductId(anyLong());
        verify(saleRepository, never()).save(any());
    }

    @Test
    void processSale_shouldThrowWhenCashierMissing() {
        String cashierEmail = "cashier@gmail.com";
        SaleItemRequest itemRequest = new SaleItemRequest(1L, 2);
        CreateSaleRequest request = new CreateSaleRequest(List.of(itemRequest), PaymentMethod.CASH, 0.0);

        when(userRepository.findByEmail(cashierEmail)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> saleService.processSale(request, cashierEmail));

        verify(userRepository).findByEmail(cashierEmail);
        verifyNoInteractions(productRepository, inventoryRepository, saleRepository, saleMapper);
    }

    @Test
    void getSaleById_shouldThrowWhenSaleMissing() {
        Long id = 1L;
        when(saleRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> saleService.getSaleById(id));

        verify(saleRepository).findById(id);
        verify(saleMapper, never()).toResponse(any());
    }

    @Test
    void getAllSales_shouldReturnMappedSales() {
        Sale sale1 = new Sale();
        sale1.setId(1L);
        Sale sale2 = new Sale();
        sale2.setId(2L);
        List<Sale> sales = List.of(sale1, sale2);

        SaleResponse response1 = new SaleResponse(
                1L,
                "Cashier One",
                "cashier1@gmail.com",
                100.0,
                10.0,
                110.0,
                PaymentMethod.CASH,
                List.of(),
                LocalDateTime.of(2026, 7, 27, 12, 0)
        );
        SaleResponse response2 = new SaleResponse(
                2L,
                "Cashier Two",
                "cashier2@gmail.com",
                200.0,
                20.0,
                220.0,
                PaymentMethod.ESEWA,
                List.of(),
                LocalDateTime.of(2026, 7, 27, 13, 0)
        );

        when(saleRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))).thenReturn(sales);
        when(saleMapper.toResponseList(sales)).thenReturn(List.of(response1, response2));

        List<SaleResponse> result = saleService.getAllSales();

        assertEquals(List.of(response1, response2), result);
        verify(saleRepository).findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        verify(saleMapper).toResponseList(sales);
    }
}
