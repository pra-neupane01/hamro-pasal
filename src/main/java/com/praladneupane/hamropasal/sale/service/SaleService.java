package com.praladneupane.hamropasal.sale.service;

import com.praladneupane.hamropasal.sale.dto.request.CreateSaleRequest;
import com.praladneupane.hamropasal.sale.dto.response.SaleResponse;

import java.util.List;

public interface SaleService {

    SaleResponse processSale(CreateSaleRequest request, String cashierEmail);

    SaleResponse getSaleById(Long id);

    List<SaleResponse> getAllSales();
}
