package com.praladneupane.hamropasal.report.service;

import com.praladneupane.hamropasal.common.dto.response.PagedResponse;
import com.praladneupane.hamropasal.customer.repository.CustomerRepository;
import com.praladneupane.hamropasal.inventory.repository.InventoryRepository;
import com.praladneupane.hamropasal.product.repository.ProductRepository;
import com.praladneupane.hamropasal.report.dto.response.DashboardStatsResponse;
import com.praladneupane.hamropasal.report.dto.response.InventoryReportResponse;
import com.praladneupane.hamropasal.report.dto.response.SalesReportResponse;
import com.praladneupane.hamropasal.sale.repository.SaleRepository;
import com.praladneupane.hamropasal.supplier.repository.SupplierRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReportServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private SupplierRepository supplierRepository;

    @Mock
    private InventoryRepository inventoryRepository;

    @Mock
    private SaleRepository saleRepository;

    @InjectMocks
    private ReportServiceImpl reportService;

    @Test
    void getDashboardStats_shouldAggregateDashboardMetrics() {
        when(productRepository.count()).thenReturn(42L);
        when(customerRepository.count()).thenReturn(18L);
        when(supplierRepository.count()).thenReturn(7L);
        when(inventoryRepository.countByQuantityInStockLessThanEqual(10)).thenReturn(3L);
        when(saleRepository.getTotalRevenue(any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(120.50, 250.75);
        when(saleRepository.countByCreatedAtBetween(any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(9);
        when(inventoryRepository.getTotalInventoryValue()).thenReturn(999.99);

        DashboardStatsResponse result = reportService.getDashboardStats();

        assertEquals(42L, result.getTotalProducts());
        assertEquals(18L, result.getTotalCustomers());
        assertEquals(7L, result.getTotalSuppliers());
        assertEquals(3L, result.getLowStockProducts());
        assertEquals(120.50, result.getTodaySales());
        assertEquals(9, result.getTodayTransactions());
        assertEquals(250.75, result.getMonthlyRevenue());
        assertEquals(999.99, result.getTotalInventoryValue());
        verify(saleRepository, times(2)).getTotalRevenue(any(LocalDateTime.class), any(LocalDateTime.class));
        verify(saleRepository).countByCreatedAtBetween(any(LocalDateTime.class), any(LocalDateTime.class));
    }

    @Test
    void getSalesAndInventoryReport_shouldReturnEmptyLists() {
        assertTrue(reportService.getSalesReport(LocalDate.now().minusDays(1), LocalDate.now()).isEmpty());
        assertTrue(reportService.getInventoryReport().isEmpty());
    }

    @Test
    void calculateMonthlyRevenue_shouldReturnZeroWhenRepositoryReturnsNull() {
        when(saleRepository.getTotalRevenue(any(LocalDateTime.class), any(LocalDateTime.class))).thenReturn(null);

        assertEquals(0.0, reportService.calculateMonthlyRevenue());
    }

    @Test
    void countLowStockProducts_shouldDelegateToRepository() {
        when(inventoryRepository.countByQuantityInStockLessThanEqual(10)).thenReturn(5L);

        assertEquals(5L, reportService.countLowStockProducts());
    }
}
