package com.praladneupane.hamropasal.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private Long totalProducts;

    private Long totalCustomers;

    private Long totalSuppliers;

    private Long lowStockProducts;

    private Double todaySales;

    private Integer todayTransactions;

    private Double monthlyRevenue;

    private Double totalInventoryValue;
}
