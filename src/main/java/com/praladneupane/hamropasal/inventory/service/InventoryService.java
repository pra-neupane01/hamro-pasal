package com.praladneupane.hamropasal.inventory.service;

import com.praladneupane.hamropasal.common.events.ProductCreatedEvent;

public interface InventoryService {
    public void createInventory(ProductCreatedEvent event);
}
