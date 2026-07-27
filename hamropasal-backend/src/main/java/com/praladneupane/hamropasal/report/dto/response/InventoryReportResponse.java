package com.praladneupane.hamropasal.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryReportResponse {

    private Long productId;

    private String productName;

    private Integer currentStock;

    private Integer reorderLevel;

    private Integer lowStockCount;

    private Double totalValue;
}
