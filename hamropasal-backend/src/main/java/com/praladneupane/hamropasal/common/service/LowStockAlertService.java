package com.praladneupane.hamropasal.common.service;

import com.praladneupane.hamropasal.common.dto.response.LowStockNotification;
import com.praladneupane.hamropasal.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class LowStockAlertService {
    private final InventoryService inventoryService;
    private final EmailService emailService;

    @Scheduled(cron = "0 0 * * * SUN-FRI")
    void sendAlert() {
        log.info("Running scheduled low-stock check...");
        List<LowStockNotification> lowStockProducts = inventoryService.getLowStockProducts();
        if (lowStockProducts.isEmpty()) {
            log.info("All products are sufficiently stocked. No alert sent.");
            return;
        }
        log.info("Found {} product(s) below stock threshold. Sending alert email.", lowStockProducts.size());
        emailService.sendLowStockAlert(lowStockProducts);
    }
}

