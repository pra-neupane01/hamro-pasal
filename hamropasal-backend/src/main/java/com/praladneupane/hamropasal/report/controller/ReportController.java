package com.praladneupane.hamropasal.report.controller;

import com.praladneupane.hamropasal.common.dto.response.APIResponse;
import com.praladneupane.hamropasal.report.dto.response.DashboardStatsResponse;
import com.praladneupane.hamropasal.report.dto.response.InventoryReportResponse;
import com.praladneupane.hamropasal.report.dto.response.SalesReportResponse;
import com.praladneupane.hamropasal.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<APIResponse<DashboardStatsResponse>> getDashboardStats() {
        DashboardStatsResponse stats = reportService.getDashboardStats();
        return ResponseEntity.ok(APIResponse.success("Dashboard stats fetched successfully", stats));
    }

    @GetMapping("/sales")
    public ResponseEntity<APIResponse<List<SalesReportResponse>>> getSalesReport(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {
        List<SalesReportResponse> report = reportService.getSalesReport(startDate, endDate);
        return ResponseEntity.ok(APIResponse.success("Sales report fetched successfully", report));
    }

    @GetMapping("/inventory")
    public ResponseEntity<APIResponse<List<InventoryReportResponse>>> getInventoryReport() {
        List<InventoryReportResponse> report = reportService.getInventoryReport();
        return ResponseEntity.ok(APIResponse.success("Inventory report fetched successfully", report));
    }

    @GetMapping("/monthly-revenue")
    public ResponseEntity<APIResponse<Double>> getMonthlyRevenue() {
        Double revenue = reportService.calculateMonthlyRevenue();
        return ResponseEntity.ok(APIResponse.success("Monthly revenue fetched successfully", revenue));
    }

    @GetMapping("/low-stock-count")
    public ResponseEntity<APIResponse<Long>> getLowStockCount() {
        Long count = reportService.countLowStockProducts();
        return ResponseEntity.ok(APIResponse.success("Low stock count fetched successfully", count));
    }
}
