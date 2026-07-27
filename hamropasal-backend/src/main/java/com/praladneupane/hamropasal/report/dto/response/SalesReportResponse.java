package com.praladneupane.hamropasal.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalesReportResponse {

    private LocalDate date;

    private Integer totalTransactions;

    private Double totalRevenue;

    private Double averageTransactionValue;

    private Integer totalItemsSold;
}
