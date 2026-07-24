package com.praladneupane.hamropasal.common.service;

import com.praladneupane.hamropasal.common.dto.response.LowStockNotification;
import com.praladneupane.hamropasal.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class LowStockAlertService {
    private final InventoryService inventoryService;

    @Scheduled(cron = "0 0 * * * SUN-FRI")
    void sendAlert() {
        List<LowStockNotification> lowStockProducts = inventoryService.getLowStockProducts();

    }
}
