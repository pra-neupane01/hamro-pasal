package com.praladneupane.hamropasal.common.service;

import com.praladneupane.hamropasal.common.dto.response.LowStockNotification;
import com.praladneupane.hamropasal.inventory.service.InventoryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LowStockAlertServiceTest {

    @Mock
    private InventoryService inventoryService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private LowStockAlertService lowStockAlertService;

    @Test
    void sendAlert_shouldNotSendEmailWhenNoLowStockProductsExist() {
        when(inventoryService.getLowStockProducts()).thenReturn(List.of());

        lowStockAlertService.sendAlert();

        verify(inventoryService).getLowStockProducts();
        verify(emailService, never()).sendLowStockAlert(any());
    }

    @Test
    void sendAlert_shouldForwardLowStockProductsToEmailService() {
        List<LowStockNotification> notifications = List.of(
                new LowStockNotification(1L, "Rice", "SKU-1", 3, 10)
        );
        when(inventoryService.getLowStockProducts()).thenReturn(notifications);

        lowStockAlertService.sendAlert();

        verify(inventoryService).getLowStockProducts();
        verify(emailService).sendLowStockAlert(notifications);
    }
}
