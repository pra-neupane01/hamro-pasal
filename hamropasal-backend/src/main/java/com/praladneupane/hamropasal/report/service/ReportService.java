package com.praladneupane.hamropasal.report.service;

import com.praladneupane.hamropasal.report.dto.response.DashboardStatsResponse;
import com.praladneupane.hamropasal.report.dto.response.InventoryReportResponse;
import com.praladneupane.hamropasal.report.dto.response.SalesReportResponse;

import java.time.LocalDate;
import java.util.List;

public interface ReportService {

    DashboardStatsResponse getDashboardStats();

    List<SalesReportResponse> getSalesReport(LocalDate startDate, LocalDate endDate);

    List<InventoryReportResponse> getInventoryReport();

    Double calculateMonthlyRevenue();

    Long countLowStockProducts();
}
