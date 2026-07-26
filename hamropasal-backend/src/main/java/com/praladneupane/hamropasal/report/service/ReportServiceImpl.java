package com.praladneupane.hamropasal.report.service;

import com.praladneupane.hamropasal.customer.repository.CustomerRepository;
import com.praladneupane.hamropasal.inventory.repository.InventoryRepository;
import com.praladneupane.hamropasal.product.repository.ProductRepository;
import com.praladneupane.hamropasal.report.dto.response.DashboardStatsResponse;
import com.praladneupane.hamropasal.report.dto.response.InventoryReportResponse;
import com.praladneupane.hamropasal.report.dto.response.SalesReportResponse;
import com.praladneupane.hamropasal.sale.repository.SaleRepository;
import com.praladneupane.hamropasal.supplier.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportServiceImpl implements ReportService {

    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final SupplierRepository supplierRepository;
    private final InventoryRepository inventoryRepository;
    private final SaleRepository saleRepository;

    @Override
    public DashboardStatsResponse getDashboardStats() {
        return DashboardStatsResponse.builder()
                .totalProducts(productRepository.count())
                .totalCustomers(customerRepository.count())
                .totalSuppliers(supplierRepository.count())
                .lowStockProducts(countLowStockProducts())
                .todaySales(getTodaySales())
                .todayTransactions(getTodayTransactions())
                .monthlyRevenue(calculateMonthlyRevenue())
                .totalInventoryValue(getTotalInventoryValue())
                .build();
    }

    @Override
    public List<SalesReportResponse> getSalesReport(LocalDate startDate, LocalDate endDate) {
        // This would require date range queries on the Sale entity
        // For now, returning empty list - implement based on your exact requirements
        return new ArrayList<>();
    }

    @Override
    public List<InventoryReportResponse> getInventoryReport() {
        // This would require joining Product and Inventory entities
        // For now, returning empty list - implement based on your exact requirements
        return new ArrayList<>();
    }

    @Override
    public Double calculateMonthlyRevenue() {
        LocalDateTime startOfMonth = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime endOfMonth = LocalDate.now().atTime(23, 59, 59);
        Double revenue = saleRepository.getTotalRevenue(startOfMonth, endOfMonth);
        return revenue != null ? revenue : 0.0;
    }

    @Override
    public Long countLowStockProducts() {
        return inventoryRepository.countByQuantityInStockLessThanEqual(10);
    }

    private Double getTodaySales() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59);
        Double revenue = saleRepository.getTotalRevenue(startOfDay, endOfDay);
        return revenue != null ? revenue : 0.0;
    }

    private Integer getTodayTransactions() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59);
        return saleRepository.countByCreatedAtBetween(startOfDay, endOfDay);
    }

    private Double getTotalInventoryValue() {
        return inventoryRepository.getTotalInventoryValue();
    }
}
