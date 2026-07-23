package com.praladneupane.hamropasal.inventory.service;

import com.praladneupane.hamropasal.common.events.ProductCreatedEvent;
import com.praladneupane.hamropasal.inventory.dto.request.RestockProductRequest;
import com.praladneupane.hamropasal.inventory.dto.request.SellProductRequest;
import com.praladneupane.hamropasal.inventory.dto.response.InventoryUpdateResponse;

public interface InventoryService {
    void createInventory(ProductCreatedEvent event);

    InventoryUpdateResponse restockProduct(RestockProductRequest request);

    InventoryUpdateResponse reduceStock(SellProductRequest request);

}
