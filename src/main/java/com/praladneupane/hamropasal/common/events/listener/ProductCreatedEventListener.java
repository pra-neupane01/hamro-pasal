package com.praladneupane.hamropasal.common.events.listener;

import com.praladneupane.hamropasal.common.events.ProductCreatedEvent;
import com.praladneupane.hamropasal.inventory.service.InventoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ProductCreatedEventListener {
    private final InventoryServiceImpl inventoryServiceImpl;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void createInventory(ProductCreatedEvent event) {


    }
}
